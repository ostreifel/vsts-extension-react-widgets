import "../../../css/WorkItemsGrid.scss";

import * as React from "react";

import { IColumn } from "OfficeFabric/DetailsList";
import { IContextualMenuItem } from "OfficeFabric/ContextualMenu";
import { SelectionMode } from "OfficeFabric/utilities/selection";

import Utils_String = require("VSS/Utils/String");
import { WorkItem, WorkItemField } from "TFS/WorkItemTracking/Contracts";
import * as WitClient from "TFS/WorkItemTracking/RestClient";

import { Loading } from "../../Common/Loading";
import { IWorkItemGridProps, IWorkItemGridState } from "./WorkItemGrid.Props";
import { Grid } from "../Grid";
import { SortOrder } from "../Grid.Props";
import * as WorkItemHelpers from "./WorkItemGridHelpers";
import { BaseStore } from "../../../Flux/Stores/BaseStore";
import { BaseComponent } from "../../Common/BaseComponent"; 

export class WorkItemGrid extends BaseComponent<IWorkItemGridProps, IWorkItemGridState> {
    static defaultProps = {
        items: [],
        fields: [],
        query: null,
        selectionMode: SelectionMode.multiple,        
        commandBarProps: {            
            hideSearchBox: false,
            hideCommandBar: false,
            refreshItems: null,
            menuItems: [],
            farMenuItems: []
        },
        contextMenuProps: {
            menuItems: []
        },
    }

    protected getStoresToLoad(): BaseStore<any, any, any>[] {
        let stores: BaseStore<any, any, any>[] = [this.fluxContext.stores.workItemColorStore];
        if (this.props.query) {
            stores.push(this.fluxContext.stores.workItemFieldStore);
        }

        return stores;
    }

    protected initialize() {
        this.fluxContext.actionsCreator.initializeWorkItemColors();
        if (this.props.query) {
            this.fluxContext.actionsCreator.initializeWorkItemFields();            
        }
        this._loadItemsAndFields(this.props);
    }

    protected initializeState(): void {
        this.state = {
            loading: true,
            items: null,
            fields: null
        };
    }
    
    protected getDefaultClassName(): string {
        return "work-items-grid";
    }

    public componentWillReceiveProps(nextProps: Readonly<IWorkItemGridProps>, nextContext: any): void {
        this._loadItemsAndFields(nextProps);
    }

    private async _loadItemsAndFields(props: IWorkItemGridProps) {
        if (this.props.query.wiql) {
            this._runQuery(this.props.query.wiql, this.props.query.project, this.props.query.top);
        }
        else {
            let items = this.props.items || [];
            let fields = this.props.fields || [];
            this.updateState({items: items.slice(), fields: fields, loading: false});
        }        
    }

    public render(): JSX.Element {
        if (this.state.loading) {
            return <Loading />;
        }
        else {
            return (
                <Grid 

                />
            );
        }        
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
        if(`${workItem.id}` === filterText) {
            return true;
        }

        for (const field of this.props.columns) {
            if (Utils_String.caseInsensitiveContains(workItem.fields[field.referenceName] == null ? "" : `${workItem.fields[field.referenceName]}`, filterText)) {
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
            data: {field: field},
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
        
        return `SELECT ${fieldStr}
                 FROM WorkItems 
                 WHERE [System.TeamProject] = @project 
                 AND [System.ID] IN (${ids}) 
                 ORDER BY [${sortColumn}] ${sortOrder}`;
    }

    private async _runQuery(wiql: string, project?: string, top?: number, updateState: boolean = true): Promise<WorkItem[]> {
        if (updateState) {
            this.updateState({loading: true, items: null, fields: null});
        }

        let queryResult = await WitClient.getClient().queryByWiql({ query: wiql }, project, null, false, top);
        let workItemIds = queryResult.workItems.map(workItem => workItem.id);
        let workItems: WorkItem[] = [];

        if (workItemIds.length > 0) {
            workItems = await WitClient.getClient().getWorkItems(workItemIds);
        }

        if (updateState) {
            this.updateState({loading: false, items: workItems, fields: queryResult.columns});
        }

        return workItems;
    }
}