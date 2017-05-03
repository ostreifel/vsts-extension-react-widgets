import * as React from "react";

import { WorkItem } from "TFS/WorkItemTracking/Contracts";
import * as WitClient from "TFS/WorkItemTracking/RestClient";
import Utils_String = require("VSS/Utils/String");

import { Loading } from "../../Common/Loading";
import { BaseComponent } from "../../Common/BaseComponent"; 
import { WorkItemGrid } from "./WorkItemGrid";
import { BaseStore } from "../../../Flux/Stores/BaseStore";
import { IQueryResultGridProps, IQueryResultGridState } from "./WorkItemGrid.Props";

export class QueryResultGrid extends BaseComponent<IQueryResultGridProps, IQueryResultGridState> {
    protected getStoresToLoad(): BaseStore<any, any, any>[] {
        return [this.fluxContext.stores.workItemFieldStore];
    }

    protected initialize() {
        this.fluxContext.actionsCreator.initializeWorkItemFields();
        this._runQuery({...this.props});
    }

    protected onStoreChanged() {
         if (!this.state.fieldsMap && this.fluxContext.stores.workItemFieldStore.isLoaded()) {
            const fields = this.fluxContext.stores.workItemFieldStore.getAll();
            let fieldsMap = {};
            fields.forEach(f => fieldsMap[f.referenceName.toLowerCase()] = f);

            this.updateState({fieldsMap: fieldsMap});
         }
    }

    public componentWillReceiveProps(nextProps: Readonly<IQueryResultGridProps>, nextContext: any): void {
        if (!Utils_String.equals(this.props.wiql, nextProps.wiql, true)) {
            this._runQuery({...nextProps});
        }
    }

    public render(): JSX.Element {
        if (!this._isDataLoaded()) {
            return <Loading />;
        }
        else {                    
            return (
                <WorkItemGrid 
                    items={this.state.items}
                    refreshItems={() => this._runQuery({...this.props}, false)}
                    columns={this.state.fieldColumns.map(fr => this.state.fieldsMap[fr.referenceName.toLowerCase()]).filter(f => f != null)}
                    columnsProps={this.props.columnsProps}
                    commandBarProps={this.props.commandBarProps}
                    contextMenuProps={this.props.contextMenuProps}
                    selectionMode={this.props.selectionMode}
                />                        
            );
        }
    }

    private async _runQuery(props: IQueryResultGridProps, updateState: boolean = true): Promise<WorkItem[]> {
        if (updateState) {
            this.updateState({areResultsLoaded: false, items: null, fieldColumns: null});
        }

        let queryResult = await WitClient.getClient().queryByWiql({ query: props.wiql }, props.project, null, false, this.props.top);
        let workItemIds = queryResult.workItems.map(workItem => workItem.id);
        let workItems: WorkItem[] = [];

        if (workItemIds.length > 0) {
            workItems = await WitClient.getClient().getWorkItems(workItemIds);
        }

        if (updateState) {
            this.updateState({areResultsLoaded: true, items: workItems, fieldColumns: queryResult.columns});
        }

        return workItems;
    }    

    private _isDataLoaded(): boolean {
        return this.state.areResultsLoaded && this.state.fieldsMap != null;
    }
}