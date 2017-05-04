import "../../../css/WorkItemsGrid.scss";

import * as React from "react";

import { IContextualMenuItem } from "OfficeFabric/ContextualMenu";
import { SelectionMode } from "OfficeFabric/utilities/selection";
import { autobind } from "OfficeFabric/Utilities";

import Utils_String = require("VSS/Utils/String");
import { WorkItem, WorkItemField } from "TFS/WorkItemTracking/Contracts";

import { IWorkItemGridProps, IWorkItemGridState, ColumnPosition } from "./WorkItemGrid.Props";
import { Grid } from "../Grid";
import { SortOrder, GridColumn, ICommandBarProps, IContextMenuProps } from "../Grid.Props";
import * as WorkItemHelpers from "./WorkItemGridHelpers";
import { BaseStore } from "../../../Flux/Stores/BaseStore";
import { BaseComponent } from "../../Common/BaseComponent"; 

export class WorkItemGrid extends BaseComponent<IWorkItemGridProps, IWorkItemGridState> {
    protected getStoresToLoad(): BaseStore<any, any, any>[] {
        return [this.fluxContext.stores.workItemColorStore];
    }

    protected initialize() {
        this.fluxContext.actionsCreator.initializeWorkItemColors();        
    }

    protected initializeState(): void {
        this.state = {
            filteredItems: this.props.items.slice()
        };
    }

    protected getDefaultClassName(): string {
        return "work-item-grid";
    }

    public render(): JSX.Element {
        return (
            <Grid
                className={this.getClassName()}
                items={this.props.items.slice()}
                columns={this._mapFieldsToColumn(this.props.fields)}
                selectionMode={this.props.selectionMode}
                commandBarProps={this._getCommandBarProps()}
                contextMenuProps={this._getContextMenuProps()}
                onItemInvoked={this._onItemInvoked}
                itemComparer={this._itemComparer}
                itemFilter={this._itemFilter}
                events={{
                    onSearch: (searchText: string, filteredItems: WorkItem[]) => {
                        this.updateState({filteredItems: filteredItems});
                    },
                    onSort: (sortColumn: GridColumn, sortOrder: SortOrder, filteredItems: WorkItem[]) => {
                        this.updateState({filteredItems: filteredItems, sortColumn: sortColumn, sortOrder: sortOrder});
                    }
                }}
            />
        );    
    }

    private _mapFieldsToColumn(fields: WorkItemField[]): GridColumn[] {
        let columns = fields.map(f => {
            const columnSize = WorkItemHelpers.getColumnSize(f);

            return {
                key: f.referenceName,
                name: f.name,
                minWidth: columnSize.minWidth,
                maxWidth: columnSize.maxWidth,
                sortable: true,
                resizable: true,
                data: {field: f},
                onRenderCell: (item: WorkItem) => WorkItemHelpers.workItemFieldCellRenderer(item, f, {workItemTypeAndStateColors: this.fluxContext.stores.workItemColorStore.getAll()})
            } as GridColumn
        });

        const extraColumns = this.props.extraColumns || [];
        const leftColumns = extraColumns.filter(c => c.position === ColumnPosition.FarLeft).map(c => c.column);
        const rightColumns = extraColumns.filter(c => c.position !== ColumnPosition.FarLeft).map(c => c.column);

        if (leftColumns.length > 0) {
            columns = leftColumns.concat(columns);
        }
        if (rightColumns.length > 0) {
            columns = columns.concat(rightColumns);
        }

        return columns;
    }

    private _getCommandBarProps(): ICommandBarProps {        
        let menuItems: IContextualMenuItem[] = [{
            key: "OpenQuery", name: "Open as query", title: "Open all workitems as a query", iconProps: {iconName: "OpenInNewWindow"}, 
            disabled: !this.state.filteredItems || this.state.filteredItems.length === 0,
            onClick: async (event?: React.MouseEvent<HTMLElement>, menuItem?: IContextualMenuItem) => {
                const url = `${VSS.getWebContext().host.uri}/${VSS.getWebContext().project.id}/_workitems?_a=query&wiql=${encodeURIComponent(this._getWiql())}`;
                window.open(url, "_blank");
            }
        }];
                
        if (this.props.commandBarProps && this.props.commandBarProps.menuItems && this.props.commandBarProps.menuItems.length > 0) {
            menuItems = menuItems.concat(this.props.commandBarProps.menuItems);
        }
        
        return {
            hideSearchBox: this.props.commandBarProps && this.props.commandBarProps.hideSearchBox,
            hideCommandBar: this.props.commandBarProps && this.props.commandBarProps.hideCommandBar,
            refreshItems: this.props.commandBarProps && this.props.commandBarProps.refreshItems,
            menuItems: menuItems,
            farMenuItems: this.props.commandBarProps && this.props.commandBarProps.farMenuItems
        };
    }

    private _getContextMenuProps(): IContextMenuProps {
        return {
            menuItems: (selectedWorkItems: WorkItem[]) => {
                let contextMenuItems: IContextualMenuItem[] = [{
                    key: "OpenQuery", name: "Open as query", title: "Open selected workitems as a query", iconProps: {iconName: "OpenInNewWindow"}, 
                    disabled: selectedWorkItems.length == 0,
                    onClick: (event?: React.MouseEvent<HTMLElement>, menuItem?: IContextualMenuItem) => {                    
                        const url = `${VSS.getWebContext().host.uri}/${VSS.getWebContext().project.id}/_workitems?_a=query&wiql=${encodeURIComponent(this._getWiql(selectedWorkItems))}`;
                        window.open(url, "_blank");
                    }
                }];

                if (this.props.contextMenuProps && this.props.contextMenuProps.menuItems) {
                    let extraMenuItems = this.props.contextMenuProps.menuItems(selectedWorkItems);
                    if (extraMenuItems && extraMenuItems.length > 0) {
                        contextMenuItems = contextMenuItems.concat(extraMenuItems);
                    }
                }

                return contextMenuItems;
            }
        }
    }

    @autobind
    private async _onItemInvoked(workItem: WorkItem, index: number, ev?: Event) {
        // fire a workitem changed event here so parent can listem to it to update work items
        WorkItemHelpers.openWorkItemDialog(null, workItem);
    }   

    @autobind
    private _itemComparer(workItem1: WorkItem, workItem2: WorkItem, sortColumn: GridColumn, sortOrder: SortOrder): number {
        return WorkItemHelpers.workItemFieldValueComparer(workItem1, workItem2, sortColumn.key, sortOrder);
    }

    @autobind
    private _itemFilter(workItem: WorkItem, filterText: string): boolean {
        if(`${workItem.id}` === filterText) {
            return true;
        }

        for (const field of this.props.fields) {
            if (Utils_String.caseInsensitiveContains(workItem.fields[field.referenceName] == null ? "" : `${workItem.fields[field.referenceName]}`, filterText)) {
                return true;
            }
        }

        return false;
    }

    private _getWiql(workItems?: WorkItem[]): string {
        const fieldStr = this.props.fields.map(f => `[${f.referenceName}]`).join(",");
        const ids = (workItems || this.state.filteredItems).map(w => w.id).join(",");
        const sortColumn = this.state.sortColumn ? this.state.sortColumn.key : "System.CreatedDate";
        const sortOrder = (this.state.sortOrder && this.state.sortOrder === SortOrder.DESC) ? "DESC" : "";

        return `SELECT ${fieldStr}
                 FROM WorkItems 
                 WHERE [System.TeamProject] = @project 
                 AND [System.ID] IN (${ids}) 
                 ORDER BY [${sortColumn}] ${sortOrder}`;
    }
}