/// <reference types="react" />
import "../../css/WorkItemsGrid.scss";
import * as React from "react";
import { IColumn } from "OfficeFabric/DetailsList";
import { Selection, SelectionMode } from "OfficeFabric/utilities/selection";
import { IContextualMenuItem } from "OfficeFabric/ContextualMenu";
import { BaseComponent } from "../Common/BaseComponent";
import { IBaseGridProps, IBaseGridState, SortOrder } from "./BaseGrid.Props";
export declare abstract class BaseGrid<TItem, TColumn, TProps extends IBaseGridProps<TItem, TColumn>, TState extends IBaseGridState<TItem>> extends BaseComponent<TProps, TState> {
    static defaultProps: {
        columns: any[];
        items: any[];
        refreshItems: any;
        selectionMode: SelectionMode;
        columnsProps: {
            disableSort: boolean;
            disableColumnResize: boolean;
        };
        commandBarProps: {
            hideSearchBox: boolean;
            hideCommandBar: boolean;
            disableRefresh: boolean;
        };
        contextMenuProps: {
            disableContextMenu: boolean;
        };
    };
    protected selection: Selection;
    private _searchTimeout;
    constructor(props: TProps, context?: any);
    render(): JSX.Element;
    protected initializeState(): void;
    protected getComponentKey(): string;
    protected getCommandMenuItems(): IContextualMenuItem[];
    protected refreshItems(): Promise<TItem[]>;
    protected getFarCommandMenuItems(): IContextualMenuItem[];
    protected getContextMenuItems(): IContextualMenuItem[];
    private _renderGrid();
    protected itemComparer(item1: TItem, item2: TItem, sortColumnKey: string, sortOrder: SortOrder): number;
    protected itemFilter(item: TItem, filterText: string): boolean;
    protected onItemInvoked(item: TItem, index: number, ev?: Event): Promise<void>;
    protected getColumns(columns: TColumn[]): IColumn[];
    protected abstract columnMapper(column: TColumn): IColumn;
    protected abstract onRenderCell(item: TItem, index: number, column: IColumn): React.ReactNode;
    private _renderCommandBar();
    private _onColumnHeaderClick(ev, column);
    private _updateFilterText(filterText);
    private _showContextMenu(item?, index?, e?);
    private _hideContextMenu();
    private _sortAndFilterWorkItems(items, sortColumnKey, sortOrder, filterText);
}
