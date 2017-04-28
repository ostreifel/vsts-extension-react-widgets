import * as React from "react";

import { WorkItem, Wiql, WorkItemQueryResult, WorkItemField} from "TFS/WorkItemTracking/Contracts";
import * as WitClient from "TFS/WorkItemTracking/RestClient";
import Utils_String = require("VSS/Utils/String");

import { autobind } from "OfficeFabric/Utilities";

import { Loading } from "../Common/Loading";
import { WorkItemGrid } from "./WorkItemGrid";
import { FluxContext } from "../../Flux/FluxContext";
import { IQueryResultGridProps, IQueryResultGridState, SortOrder, ColumnPosition, ColumnType, IColumnProps } from "./WorkItemGrid.Props";

export class QueryResultGrid extends React.Component<IQueryResultGridProps, IQueryResultGridState> {
    private _context: FluxContext;

    constructor(props: IQueryResultGridProps, context: any) {
        super(props, context);
        this._context = FluxContext.get();
        this._initializeState();
    }

    private _initializeState() {
        this.state = {
            
        };
    }

    public componentDidMount() {
        this._context.stores.workItemFieldStore.addChangedListener(this._onStoreChanged);
        this._context.actionsCreator.initializeWorkItemFields();
        this._runQuery({...this.props});
    }

    public componentWillUnmount() {
        this._context.stores.workItemFieldStore.removeChangedListener(this._onStoreChanged);
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
                    refreshWorkItems={() => this._runQuery({...this.props}, false)}
                    fieldColumns={this.state.fieldColumns.map(fr => this.state.fieldsMap[fr.referenceName.toLowerCase()]).filter(f => f != null)}
                    columnsProps={this.props.columnsProps}
                    commandBarProps={this.props.commandBarProps}
                    contextMenuProps={this.props.contextMenuProps}
                    onItemInvoked={this.props.onItemInvoked}
                    selectionMode={this.props.selectionMode}
                />                        
            );
        }
    }

    private async _runQuery(props: IQueryResultGridProps, updateState: boolean = true): Promise<WorkItem[]> {
        if (updateState) {
            this._updateState({areResultsLoaded: false, items: null, fieldColumns: null});
        }

        let queryResult = await WitClient.getClient().queryByWiql({ query: props.wiql }, props.project, null, false, this.props.top);
        let workItemIds = queryResult.workItems.map(workItem => workItem.id);
        let workItems: WorkItem[] = [];

        if (workItemIds.length > 0) {
            workItems = await WitClient.getClient().getWorkItems(workItemIds);
        }

        if (updateState) {
            this._updateState({areResultsLoaded: true, items: workItems, fieldColumns: queryResult.columns});
        }

        return workItems;
    }

    @autobind
    private _onStoreChanged() {
         if (!this.state.fieldsMap && this._context.stores.workItemFieldStore.isLoaded()) {
            const fields = this._context.stores.workItemFieldStore.getAll();
            let fieldsMap = {};
            fields.forEach(f => fieldsMap[f.referenceName.toLowerCase()] = f);

            this._updateState({fieldsMap: fieldsMap});
         }
    }

    private _isDataLoaded(): boolean {
        return this.state.areResultsLoaded && this.state.fieldsMap != null;
    }

    private _updateState(updatedStates: IQueryResultGridState) {
        this.setState({...this.state, ...updatedStates});
    }
}