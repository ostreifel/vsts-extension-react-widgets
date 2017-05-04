import * as React from "react";
import { WorkItem, WorkItemField, WorkItemFieldReference } from "TFS/WorkItemTracking/Contracts";
import { SelectionMode } from "OfficeFabric/utilities/selection/interfaces";
import { ICommandBarProps, IContextMenuProps, GridColumn } from "../Grid.Props";

export interface IWorkItemGridProps {    
    items?: WorkItem[];
    fields?: WorkItemField[];
    query?: IQueryProps;
    selectionMode?: SelectionMode;
    commandBarProps?: ICommandBarProps;
    contextMenuProps?: IContextMenuProps;
}

export interface IWorkItemGridState {
    loading?: boolean;
    items?: WorkItem[];
    fields?: WorkItemField[];
    workItemTypeAndStateColors?: IDictionaryStringTo<{color: string, stateColors: IDictionaryStringTo<string>}>;
}

export interface IQueryProps {
    wiql: string;
    top?: number;
    project?: string;
}