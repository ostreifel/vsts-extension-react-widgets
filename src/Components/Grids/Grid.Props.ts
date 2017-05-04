import { SelectionMode } from "OfficeFabric/utilities/selection/interfaces";
import { ContextualMenu, IContextualMenuItem } from "OfficeFabric/ContextualMenu";

import { IBaseComponentProps, IBaseComponentState } from "../Common/BaseComponent"; 

export interface IGridProps extends IBaseComponentProps {
    items?: any[];
    columns?: GridColumn[];
    selectionMode?: SelectionMode;
    commandBarProps?: ICommandBarProps;
    contextMenuProps?: IContextMenuProps;
    onItemInvoked?: (item: any, index: number) => void;
    itemComparer?: (item1: any, item2: any, sortColumn: GridColumn, sortOrder: SortOrder) => number;
    itemFilter?: (item: any, filterText: string) => boolean;
    events?: IGridEvents;
}

export interface IGridState extends IBaseComponentState {
    filteredItems?: any[];
    items?: any[];
    loading?: boolean;
    isContextMenuVisible?: boolean;
    contextMenuTarget?: MouseEvent;
    sortColumn?: GridColumn;
    sortOrder?: SortOrder;
    filterText?: string;
}

export interface GridColumn {
    key: string;
    name: string;
    minWidth: number;
    maxWidth?: number;
    sortable?: boolean;
    resizable?: boolean;
    onRenderCell?: (item?: any, index?: number, column?: GridColumn) => JSX.Element;
    data?: any;
}

export interface ICommandBarProps {
    hideSearchBox?: boolean;
    hideCommandBar?: boolean;
    refreshItems?: () => Promise<any[]>;
    menuItems?: IContextualMenuItem[];
    farMenuItems?: IContextualMenuItem[];
}

export interface IContextMenuProps {
    menuItems?: IContextualMenuItem[];
}

export interface IGridEvents {
    onSearch?: (searchText: string, filteredItems: any) => void;
    onSort?: (sortColumn: GridColumn, sortOrder: SortOrder, filteredItems: any) => void;
}

export enum SortOrder {
    ASC,
    DESC
}