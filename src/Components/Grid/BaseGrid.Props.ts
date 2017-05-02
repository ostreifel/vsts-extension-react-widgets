import { IContextualMenuItem } from "OfficeFabric/ContextualMenu";
import { SelectionMode } from "OfficeFabric/utilities/selection/interfaces";
import { IColumn } from "OfficeFabric/DetailsList";

export interface IBaseGridProps<TItem> {
    columnsProps?: IColumnsProps<TItem>;    
    commandBarProps?: ICommandBarProps;
    contextMenuProps?: IContextMenuProps<TItem>;
    onItemInvoked?: (item: TItem, index: number) => void;
    selectionMode?: SelectionMode;
}

export interface IBaseGridState<TItem> {
    filteredItems?: TItem[];
    items?: TItem[];
    loading?: boolean; 
    isContextMenuVisible?: boolean;
    contextMenuTarget?: MouseEvent;
    sortColumn?: IColumn;
    sortOrder?: SortOrder;
    filterText?: string;
}

export interface IColumnsProps<TItem> {
    disableSort?: boolean;
    disableColumnResize?: boolean;
    extraColumns?: IColumnProps<TItem>[];
}

export interface IColumnProps<TItem> {    
    key: string;
    name: string;
    renderer: (item: TItem, index?: number) => JSX.Element;
    comparer?: (item1: TItem, item2: TItem, sortColumnKey: string, sortOrder: SortOrder) => number;
    minWidth?: number,
    maxWidth?: number,
    position?: ColumnPosition;
}

export enum ColumnPosition {
    FarLeft,
    FarRight
}

export interface ICommandBarProps {
    hideSearchBox?: boolean;
    hideCommandBar?: boolean;
    extraCommandMenuItems?: IContextualMenuItem[];
    farCommandMenuItems?: IContextualMenuItem[];
}

export interface IContextMenuProps<TItem> {
    disableContextMenu?: boolean;
    extraContextMenuItems?: (selectedRows: TItem[]) => IContextualMenuItem[];
}

export enum SortOrder {
    ASC,
    DESC
}

export enum ColumnType {
    Field,
    Custom
}