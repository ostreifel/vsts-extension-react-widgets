/// <reference types="react" />
import * as React from "react";
import { IQueryResultGridProps, IQueryResultGridState } from "./WorkItemGrid.Props";
export declare class QueryResultGrid extends React.Component<IQueryResultGridProps, IQueryResultGridState> {
    private _context;
    constructor(props: IQueryResultGridProps, context: any);
    private _initializeState();
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(nextProps: Readonly<IQueryResultGridProps>, nextContext: any): void;
    render(): JSX.Element;
    private _runQuery(props, updateState?);
    private _onStoreChanged();
    private _isDataLoaded();
    private _updateState(updatedStates);
}
