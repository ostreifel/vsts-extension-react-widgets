/// <reference types="react" />
import "../../css/WorkItemsGrid.scss";
import * as React from "react";
import { IWorkItemsGridProps, IWorkItemsGridState } from "./WorkItemsGrid.Props";
export declare class WorkItemsGrid extends React.Component<IWorkItemsGridProps, IWorkItemsGridState> {
    static defaultProps: IWorkItemsGridProps;
    private _selection;
    private _searchTimeout;
    private _context;
    constructor(props: IWorkItemsGridProps, context: any);
    private _initializeState();
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    private _renderCommandBar();
    private _getCommandMenuItems();
    private _getFarCommandMenuItems();
    private _getContextMenuItems();
    private _renderWorkItemGrid();
    private _sortAndFilterWorkItems(workItems, sortColumn, sortOrder, filterText);
    private _doesAnyFieldValueContains(workItem, fields, text);
    private _getColumns();
    private _onColumnHeaderClick(ev, column);
    private _onRenderCell(item, index, column);
    private _getWiql(workItems?);
    private _updateFilterText(filterText);
    private _showContextMenu(item?, index?, e?);
    private _hideContextMenu(e?);
    private _updateState(updatedStates);
    private _onStoreChanged();
    private _getClassName(className?);
}
