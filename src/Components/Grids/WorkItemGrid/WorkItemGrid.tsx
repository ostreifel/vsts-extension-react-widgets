import "../../../css/WorkItemsGrid.scss";

import * as React from "react";

import { IColumn } from "OfficeFabric/DetailsList";
import { IContextualMenuItem } from "OfficeFabric/ContextualMenu";

import Utils_String = require("VSS/Utils/String");
import { WorkItem, WorkItemField } from "TFS/WorkItemTracking/Contracts";

import { IWorkItemGridProps, IWorkItemGridState } from "./WorkItemGrid.Props";
import { BaseGrid } from "../BaseGrid";
import { SortOrder } from "../BaseGrid.Props";
import * as WorkItemHelpers from "./WorkItemGridHelpers";
import { BaseStore } from "../../../Flux/Stores/BaseStore";

export class WorkItemGrid extends BaseGrid<WorkItem, WorkItemField, IWorkItemGridProps, IWorkItemGridState> {
    protected getStoresToLoad(): BaseStore<any, any, any>[] {
        return [this.fluxContext.stores.workItemColorStore];
    }

    protected initialize() {
        this.fluxContext.actionsCreator.initializeWorkItemColors();
    }
    
    protected getComponentKey(): string {
        return "work-item-grid";
    }

    protected getCommandMenuItems(): IContextualMenuItem[] {
        let menuItems: IContextualMenuItem[] = super.getCommandMenuItems();
                
        menuItems.push({
            key: "OpenQuery", name: "Open as query", title: "Open all workitems as a query", iconProps: {iconName: "OpenInNewWindow"}, 
            disabled: !this.state.filteredItems || this.state.filteredItems.length === 0,
            onClick: async (event?: React.MouseEvent<HTMLElement>, menuItem?: IContextualMenuItem) => {
                const url = `${VSS.getWebContext().host.uri}/${VSS.getWebContext().project.id}/_workitems?_a=query&wiql=${encodeURIComponent(this._getWiql())}`;
                window.open(url, "_blank");
            }
        });        

        return menuItems;
    }

    protected getContextMenuItems(): IContextualMenuItem[] {        
        let menuItems: IContextualMenuItem[] = super.getContextMenuItems();
        const selectedWorkItems = this.selection.getSelection() as WorkItem[];

        menuItems.push({
            key: "OpenQuery", name: "Open as query", title: "Open selected workitems as a query", iconProps: {iconName: "OpenInNewWindow"}, 
            disabled: this.selection.getSelectedCount() == 0,
            onClick: (event?: React.MouseEvent<HTMLElement>, menuItem?: IContextualMenuItem) => {                    
                const url = `${VSS.getWebContext().host.uri}/${VSS.getWebContext().project.id}/_workitems?_a=query&wiql=${encodeURIComponent(this._getWiql(selectedWorkItems))}`;
                window.open(url, "_blank");
            }
        });

        return menuItems;
    }

    protected itemComparer(workItem1: WorkItem, workItem2: WorkItem, sortColumnKey: string, sortOrder: SortOrder): number {
        return WorkItemHelpers.workItemFieldValueComparer(workItem1, workItem2, sortColumnKey, sortOrder);
    }

    protected itemFilter(workItem: WorkItem, filterText: string): boolean {
        for (const field of this.props.columns) {
            if (Utils_String.caseInsensitiveContains(workItem.fields[field.referenceName] || "", filterText)) {
                return true;
            }
        }

        return false;
    }

    protected async onItemInvoked(workItem: WorkItem, index: number, ev?: Event) {
        WorkItemHelpers.openWorkItemDialog(null, workItem);
    }

    protected columnMapper(field: WorkItemField): IColumn {
        const columnSize = WorkItemHelpers.getColumnSize(field);

        return {
            fieldName: field.referenceName,
            key: field.referenceName,
            name: field.name,
            minWidth: columnSize.minWidth,
            maxWidth: columnSize.maxWidth,
            isResizable: !this.props.columnsProps.disableColumnResize,
            isSorted: this.state.sortColumnKey && Utils_String.equals(this.state.sortColumnKey, field.referenceName, true),
            isSortedDescending: this.state.sortOrder && this.state.sortOrder === SortOrder.DESC
        }
    }

    protected onRenderCell(workItem: WorkItem, index: number, column: IColumn): React.ReactNode {
        return WorkItemHelpers.workItemFieldCellRenderer(workItem, index, column, {workItemTypeAndStateColors: this.fluxContext.stores.workItemColorStore.getAll()});
    }    

    private _getWiql(workItems?: WorkItem[]): string {
        const fieldStr = this.props.columns.map(f => `[${f.referenceName}]`).join(",");
        const ids = (workItems || this.state.filteredItems).map(w => w.id).join(",");
        const sortColumn = this.state.sortColumnKey ? this.state.sortColumnKey : "System.CreatedDate";
        const sortOrder = this.state.sortOrder === SortOrder.DESC ? "DESC" : "";

        return `SELECT ${fieldStr}
                 FROM WorkItems 
                 WHERE [System.TeamProject] = @project 
                 AND [System.ID] IN (${ids}) 
                 ORDER BY [${sortColumn}] ${sortOrder}`;
    }    
}