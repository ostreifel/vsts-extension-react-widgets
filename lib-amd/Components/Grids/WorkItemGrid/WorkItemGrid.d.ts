/// <reference types="react" />
import "../../../css/WorkItemsGrid.scss";
import * as React from "react";
import { IColumn } from "OfficeFabric/DetailsList";
import { IContextualMenuItem } from "OfficeFabric/ContextualMenu";
import { WorkItem, WorkItemField } from "TFS/WorkItemTracking/Contracts";
import { IWorkItemGridProps, IWorkItemGridState } from "./WorkItemGrid.Props";
import { BaseGrid } from "../BaseGrid";
import { SortOrder } from "../BaseGrid.Props";
import { BaseStore } from "../../../Flux/Stores/BaseStore";
export declare class WorkItemGrid extends BaseGrid<WorkItem, WorkItemField, IWorkItemGridProps, IWorkItemGridState> {
    protected getStoresToLoad(): BaseStore<any, any, any>[];
    protected initialize(): void;
    protected getComponentKey(): string;
    protected getCommandMenuItems(): IContextualMenuItem[];
    protected getContextMenuItems(): IContextualMenuItem[];
    protected itemComparer(workItem1: WorkItem, workItem2: WorkItem, sortColumnKey: string, sortOrder: SortOrder): number;
    protected itemFilter(workItem: WorkItem, filterText: string): boolean;
    protected onItemInvoked(workItem: WorkItem, index: number, ev?: Event): Promise<void>;
    protected columnMapper(field: WorkItemField): IColumn;
    protected onRenderCell(workItem: WorkItem, index: number, column: IColumn): React.ReactNode;
    private _getWiql(workItems?);
}
