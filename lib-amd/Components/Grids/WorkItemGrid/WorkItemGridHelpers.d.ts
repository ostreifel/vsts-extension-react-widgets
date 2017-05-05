/// <reference types="react" />
import * as React from "react";
import { WorkItem, WorkItemField } from "TFS/WorkItemTracking/Contracts";
import { SortOrder } from "../Grid.Props";
export declare function workItemFieldValueComparer(w1: WorkItem, w2: WorkItem, field: WorkItemField, sortOrder: SortOrder): number;
export declare function workItemFieldCellRenderer(item: WorkItem, field: WorkItemField): JSX.Element;
export declare function getColumnSize(field: WorkItemField): {
    minWidth: number;
    maxWidth: number;
};
export declare function openWorkItemDialog(e: React.MouseEvent<HTMLElement>, item: WorkItem): Promise<any>;
