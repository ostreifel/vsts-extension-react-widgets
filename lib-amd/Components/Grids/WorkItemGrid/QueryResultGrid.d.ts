/// <reference types="react" />
import { BaseComponent } from "../../Common/BaseComponent";
import { BaseStore } from "../../../Flux/Stores/BaseStore";
import { IQueryResultGridProps, IQueryResultGridState } from "./WorkItemGrid.Props";
export declare class QueryResultGrid extends BaseComponent<IQueryResultGridProps, IQueryResultGridState> {
    protected getStoresToLoad(): BaseStore<any, any, any>[];
    protected initialize(): void;
    protected onStoreChanged(): void;
    protected initializeState(): void;
    componentWillReceiveProps(nextProps: Readonly<IQueryResultGridProps>, nextContext: any): void;
    render(): JSX.Element;
    private _getCommandBarProps();
    private _runQuery(props, updateState?);
    private _isDataLoaded();
}
