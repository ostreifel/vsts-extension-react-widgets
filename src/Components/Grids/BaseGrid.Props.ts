import { SelectionMode } from "OfficeFabric/utilities/selection/interfaces";

import { IBaseComponentProps, IBaseComponentState } from "../Common/BaseComponent"; 

export interface IBaseGridProps<TItem, TColumn> extends IBaseComponentProps {
    items?: TItem[];
    columns?: TColumn[];    
    columnsProps?: IColumnsProps<TItem>;    
    commandBarProps?: ICommandBarProps;
    contextMenuProps?: IContextMenuProps<TItem>;
    selectionMode?: SelectionMode;
    refreshItems?: () => Promise<TItem[]>;
}

export interface IBaseGridState<TItem, TColumn> extends IBaseComponentState {
    filteredItems?: TItem[];
    items?: TItem[];
    columns?: TColumn[];
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

export enum SortOrder {
    ASC,
    DESC
}