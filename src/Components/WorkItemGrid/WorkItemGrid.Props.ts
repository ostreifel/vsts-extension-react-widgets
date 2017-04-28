import * as React from "react";

import { WorkItem, WorkItemField, WorkItemFieldReference } from "TFS/WorkItemTracking/Contracts";

import { IContextualMenuItem } from "OfficeFabric/ContextualMenu";
import { SelectionMode } from "OfficeFabric/utilities/selection/interfaces";
import { IColumn } from "OfficeFabric/DetailsList";

export interface IBaseWorkItemGridProps {
    columnsProps?: IColumnsProps    
    commandBarProps?: ICommandBarProps;
    contextMenuProps?: IContextMenuProps;
    onItemInvoked?: (workItem: WorkItem, index: number) => void;
    selectionMode?: SelectionMode;
}

export interface IWorkItemGridProps extends IBaseWorkItemGridProps {    
    fieldColumns: WorkItemField[];
    items: WorkItem[];
    refreshWorkItems?: () => Promise<WorkItem[]>;    
}

export interface IQueryResultGridProps extends IBaseWorkItemGridProps  {
    wiql: string;
    top?: number;
    project?: string;
}

export interface IWorkItemGridState {
    filteredItems?: WorkItem[];
    items?: WorkItem[];
    loading?: boolean; 
    isContextMenuVisible?: boolean;
    contextMenuTarget?: MouseEvent;
    workItemTypeAndStateColors?: IDictionaryStringTo<{color: string, stateColors: IDictionaryStringTo<string>}>;
    sortColumn?: IColumn;
    sortOrder?: SortOrder;
    filterText?: string;
}

export interface IQueryResultGridState {
    areResultsLoaded?: boolean;
    items?: WorkItem[];
    fieldColumns?: WorkItemFieldReference[];
    fieldsMap?: IDictionaryStringTo<WorkItemField>;
}

export interface IColumnsProps {
    disableSort?: boolean;
    disableColumnResize?: boolean;
    extraColumns?: IColumnProps[];
}

export interface IColumnProps {    
    key: string;
    name: string;
    renderer: (row: WorkItem, index?: number) => JSX.Element;
    comparer?: (row1: WorkItem, row2: WorkItem, sortColumnKey: string, sortOrder: SortOrder) => number,
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

export interface IContextMenuProps {
    disableContextMenu?: boolean;
    extraContextMenuItems?: (selectedRows: WorkItem[]) => IContextualMenuItem[];
}

export enum SortOrder {
    ASC,
    DESC
}

export enum ColumnType {
    Field,
    Custom
}