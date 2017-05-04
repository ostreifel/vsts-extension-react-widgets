/// <reference types="react" />
import { SelectionMode } from "OfficeFabric/utilities/selection/interfaces";
import { IContextualMenuItem } from "OfficeFabric/ContextualMenu";
import { IBaseComponentProps, IBaseComponentState } from "../Common/BaseComponent";
export interface IGridProps extends IBaseComponentProps {
    items: any[];
    columns: GridColumn[];
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
    onRenderCell?: (item?: any, index?: number) => JSX.Element;
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
    menuItems?: (selectedItems: any[]) => IContextualMenuItem[];
}
export interface IGridEvents {
    onSearch?: (searchText: string, filteredItems: any[]) => void;
    onSort?: (sortColumn: GridColumn, sortOrder: SortOrder, filteredItems: any[]) => void;
    onSelectionChanged?: (selectedItems: any[]) => void;
}
export declare enum SortOrder {
    ASC = 0,
    DESC = 1,
}
