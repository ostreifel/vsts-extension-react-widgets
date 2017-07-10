/// <reference types="react" />
import { BaseComponent } from "../../Common/BaseComponent";
import { BaseStore } from "../../../Flux/Stores/BaseStore";
import { IQueryResultGridProps, IQueryResultGridState } from "./WorkItemGrid.Props";
export declare class QueryResultGrid extends BaseComponent<IQueryResultGridProps, IQueryResultGridState> {
    private _workItemFieldStore;
    protected getStores(): BaseStore<any, any, any>[];
    componentDidMount(): void;
    protected getStoresState(): IQueryResultGridState;
    protected getDefaultClassName(): string;
    componentWillReceiveProps(nextProps: Readonly<IQueryResultGridProps>, nextContext: any): void;
    render(): JSX.Element;
    private _onWorkItemUpdated(updatedWorkItem);
    private _getCommandBarProps();
    private _runQuery(props);
    private _isDataLoaded();
}
