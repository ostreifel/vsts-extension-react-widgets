/// <reference types="react" />
import "../../../css/WorkItemsGrid.scss";
import { IWorkItemGridProps, IWorkItemGridState } from "./WorkItemGrid.Props";
import { BaseStore } from "../../../Flux/Stores/BaseStore";
import { BaseComponent } from "../../Common/BaseComponent";
export declare class WorkItemGrid extends BaseComponent<IWorkItemGridProps, IWorkItemGridState> {
    protected getStoresToLoad(): BaseStore<any, any, any>[];
    protected initialize(): void;
    protected initializeState(): void;
    protected getDefaultClassName(): string;
    render(): JSX.Element;
    private _mapFieldsToColumn(fields);
    private _getCommandBarProps();
    private _getContextMenuProps();
    private _onItemInvoked(workItem, index, ev?);
    private _itemComparer(workItem1, workItem2, sortColumn, sortOrder);
    private _itemFilter(workItem, filterText);
    private _getWiql(workItems?);
}
