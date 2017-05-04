import * as React from "react";

import { WorkItem } from "TFS/WorkItemTracking/Contracts";
import * as WitClient from "TFS/WorkItemTracking/RestClient";
import Utils_String = require("VSS/Utils/String");

import { Loading } from "../../Common/Loading";
import { BaseComponent } from "../../Common/BaseComponent"; 
import { WorkItemGrid } from "./WorkItemGrid";
import { BaseStore } from "../../../Flux/Stores/BaseStore";
import { IQueryResultGridProps, IQueryResultGridState } from "./WorkItemGrid.Props";
import { ICommandBarProps } from "../Grid.Props";

export class QueryResultGrid extends BaseComponent<IQueryResultGridProps, IQueryResultGridState> {
    protected getStoresToLoad(): BaseStore<any, any, any>[] {
        return [this.fluxContext.stores.workItemFieldStore];
    }

    protected initialize() {
        this.fluxContext.actionsCreator.initializeWorkItemFields();
        this._runQuery(this.props);
    }

    protected onStoreChanged() {
         if (!this.state.fieldsMap && this.fluxContext.stores.workItemFieldStore.isLoaded()) {
            const fields = this.fluxContext.stores.workItemFieldStore.getAll();
            let fieldsMap = {};
            fields.forEach(f => fieldsMap[f.referenceName.toLowerCase()] = f);

            this.updateState({fieldsMap: fieldsMap});
         }
    }

    protected initializeState(): void {
        this.state = {
            
        };
    }

    public componentWillReceiveProps(nextProps: Readonly<IQueryResultGridProps>, nextContext: any): void {
        if (!Utils_String.equals(this.props.wiql, nextProps.wiql, true) || 
            !Utils_String.equals(this.props.project, nextProps.project, true) || 
            this.props.top !== nextProps.top) {

            this._runQuery(nextProps);
        }
    }

    public render(): JSX.Element {
        if (!this._isDataLoaded()) {
            return <Loading />;
        }
        else {                    
            return (
                <WorkItemGrid 
                    items={this.state.workItems}
                    fields={this.state.fieldColumns.map(fr => this.state.fieldsMap[fr.referenceName.toLowerCase()]).filter(f => f != null)}
                    commandBarProps={this.props.commandBarProps}
                    contextMenuProps={this.props.contextMenuProps}
                    selectionMode={this.props.selectionMode}
                    extraColumns={this.props.extraColumns}
                />                        
            );
        }
    }

    private _getCommandBarProps(): ICommandBarProps {
        return {
            hideSearchBox: this.props.commandBarProps && this.props.commandBarProps.hideSearchBox,
            hideCommandBar: this.props.commandBarProps && this.props.commandBarProps.hideCommandBar,
            refreshItems: async () => {
                if (this.props.commandBarProps && this.props.commandBarProps.refreshItems) {
                    return this.props.commandBarProps.refreshItems();
                }
                else {
                    return this._runQuery(this.props, false);
                }
            },
            menuItems: this.props.commandBarProps && this.props.commandBarProps.menuItems,
            farMenuItems: this.props.commandBarProps && this.props.commandBarProps.farMenuItems
        }
    }

    private async _runQuery(props: IQueryResultGridProps, updateState: boolean = true): Promise<WorkItem[]> {
        if (updateState) {
            this.updateState({workItems: null, fieldColumns: null});
        }

        let queryResult = await WitClient.getClient().queryByWiql({ query: props.wiql }, props.project, null, false, this.props.top);
        let workItemIds = queryResult.workItems.map(workItem => workItem.id);
        let workItems: WorkItem[] = [];

        if (workItemIds.length > 0) {
            workItems = await WitClient.getClient().getWorkItems(workItemIds);
        }

        if (updateState) {
            this.updateState({workItems: workItems, fieldColumns: queryResult.columns});
        }

        return workItems;
    }    

    private _isDataLoaded(): boolean {
        return this.state.workItems != null && this.state.fieldColumns != null && this.state.fieldsMap != null;
    }
}