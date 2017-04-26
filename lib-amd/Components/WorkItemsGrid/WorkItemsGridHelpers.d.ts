/// <reference types="react" />
import * as React from "react";
import { WorkItem, WorkItemField } from "TFS/WorkItemTracking/Contracts";
import { IColumn } from "OfficeFabric/DetailsList";
import { SortOrder } from "./WorkItemsGrid.Props";
export interface workItemFieldCellRendererOptions {
    workItemTypeAndStateColors?: IDictionaryStringTo<{
        color: string;
        stateColors: IDictionaryStringTo<string>;
    }>;
}
export declare function workItemFieldValueComparer(w1: WorkItem, w2: WorkItem, fieldRefName: string, sortOrder: SortOrder): number;
export declare function workItemFieldCellRenderer(item: WorkItem, index: number, column: IColumn, extraData?: workItemFieldCellRendererOptions): JSX.Element;
export declare function getColumnSize(field: WorkItemField): {
    minWidth: number;
    maxWidth: number;
};
export declare function openWorkItemDialog(e: React.MouseEvent<HTMLElement>, item: WorkItem): Promise<void>;
