import { SelectionMode } from "OfficeFabric/utilities/selection/interfaces";
import { IBaseComponentState } from "../Common/BaseComponent";
export interface IBaseGridProps<TItem, TColumn> {
    items: TItem[];
    columns?: TColumn[];
    columnsProps?: IColumnsProps<TItem>;
    commandBarProps?: ICommandBarProps;
    contextMenuProps?: IContextMenuProps<TItem>;
    selectionMode?: SelectionMode;
    refreshItems?: () => Promise<TItem[]>;
}
export interface IBaseGridState<TItem> extends IBaseComponentState {
    filteredItems?: TItem[];
    items?: TItem[];
    loading?: boolean;
    isContextMenuVisible?: boolean;
    contextMenuTarget?: MouseEvent;
    sortColumnKey?: string;
    sortOrder?: SortOrder;
    filterText?: string;
}
export interface IColumnsProps<TItem> {
    disableSort?: boolean;
    disableColumnResize?: boolean;
}
export interface ICommandBarProps {
    hideSearchBox?: boolean;
    hideCommandBar?: boolean;
    disableRefresh?: boolean;
}
export interface IContextMenuProps<TItem> {
    disableContextMenu?: boolean;
}
export declare enum SortOrder {
    ASC = 0,
    DESC = 1,
}
