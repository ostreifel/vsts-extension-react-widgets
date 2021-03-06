import * as React from "react";
import { IContextualMenuItem } from "OfficeFabric/ContextualMenu";
import { autobind } from "OfficeFabric/Utilities";

import { WorkItem } from "TFS/WorkItemTracking/Contracts";
import * as WitClient from "TFS/WorkItemTracking/RestClient";
import Utils_String = require("VSS/Utils/String");
import Utils_Array = require("VSS/Utils/Array");

import { Loading } from "../../Common/Loading";
import { BaseComponent } from "../../Common/BaseComponent"; 
import { WorkItemGrid } from "./WorkItemGrid";
import { BaseStore, StoreFactory } from "../../../Flux/Stores/BaseStore";
import { WorkItemFieldStore } from "../../../Flux/Stores/WorkItemFieldStore";
import { WorkItemFieldActions } from "../../../Flux/Actions/WorkItemFieldActions";
import { IQueryResultGridProps, IQueryResultGridState } from "./WorkItemGrid.Props";
import { ICommandBarProps } from "../Grid.Props";

export class QueryResultGrid extends BaseComponent<IQueryResultGridProps, IQueryResultGridState> {
    private _workItemFieldStore = StoreFactory.getInstance<WorkItemFieldStore>(WorkItemFieldStore);

    protected getStores(): BaseStore<any, any, any>[] {
        return [this._workItemFieldStore];
    }

    public componentDidMount() {
        super.componentDidMount();
        WorkItemFieldActions.initializeWorkItemFields();
        this._runQuery(this.props);
    }

    protected getStoresState(): IQueryResultGridState {
        if (this._workItemFieldStore.isLoaded()) {
            const fields = this._workItemFieldStore.getAll();
            let fieldsMap = {};
            fields.forEach(f => fieldsMap[f.referenceName.toLowerCase()] = f);

            return {
                fieldsMap: fieldsMap
            };
        }
        else {
            return {};
        }
    }

    protected getDefaultClassName(): string {
        return "query-results-grid";
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
                    className={this.getClassName()}
                    workItems={this.state.workItems}
                    fields={this.state.fieldColumns.map(fr => this.state.fieldsMap[fr.referenceName.toLowerCase()]).filter(f => f != null)}
                    commandBarProps={this._getCommandBarProps()}
                    contextMenuProps={this.props.contextMenuProps}
                    selectionMode={this.props.selectionMode}
                    extraColumns={this.props.extraColumns}
                    setKey={this.props.setKey}
                    selectionPreservedOnEmptyClick={this.props.selectionPreservedOnEmptyClick || false}
                    onWorkItemUpdated={this._onWorkItemUpdated}
                    noResultsText={this.props.noResultsText || "Query returned no results."}
                />                        
            );
        }
    }

    @autobind
    private _onWorkItemUpdated(updatedWorkItem: WorkItem) {
        let newList = this.state.workItems.slice();
        const index = Utils_Array.findIndex(this.state.workItems, w => w.id === updatedWorkItem.id);
        if (index !== -1) {
            newList[index].fields = updatedWorkItem.fields;
            newList[index].rev = updatedWorkItem.rev;
            this.updateState({workItems: newList});
        }
    }

    private _getCommandBarProps(): ICommandBarProps {        
        let menuItems: IContextualMenuItem[] = [             
            {
                key: "refresh", name: "Refresh", title: "Refresh items", iconProps: {iconName: "Refresh"},
                onClick: (event?: React.MouseEvent<HTMLElement>, menuItem?: IContextualMenuItem) => {
                    this._runQuery(this.props);
                }
            }
        ];
                
        if (this.props.commandBarProps && this.props.commandBarProps.menuItems && this.props.commandBarProps.menuItems.length > 0) {
            menuItems = menuItems.concat(this.props.commandBarProps.menuItems);
        }
        
        return {
            hideSearchBox: this.props.commandBarProps && this.props.commandBarProps.hideSearchBox,
            hideCommandBar: this.props.commandBarProps && this.props.commandBarProps.hideCommandBar,
            menuItems: menuItems,
            farMenuItems: this.props.commandBarProps && this.props.commandBarProps.farMenuItems
        };
    }

    private async _runQuery(props: IQueryResultGridProps) {
        this.updateState({workItems: null, fieldColumns: null});

        let queryResult = await WitClient.getClient().queryByWiql({ query: props.wiql }, props.project, null, false, this.props.top);
        let workItemIds = queryResult.workItems.map(workItem => workItem.id);
        let workItems: WorkItem[] = [];

        if (workItemIds.length > 0) {
            workItems = await WitClient.getClient().getWorkItems(workItemIds);
        }

        this.updateState({workItems: workItems, fieldColumns: queryResult.columns});
    }    

    private _isDataLoaded(): boolean {
        return this.state.workItems != null && this.state.fieldColumns != null && this.state.fieldsMap != null;
    }
}