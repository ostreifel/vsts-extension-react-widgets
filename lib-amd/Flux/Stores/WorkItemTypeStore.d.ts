import { WorkItemType } from "TFS/WorkItemTracking/Contracts";
import { BaseStore } from "./BaseStore";
import { ActionsHub } from "../Actions/ActionsCreator";
export declare class WorkItemTypeStore extends BaseStore<WorkItemType[], WorkItemType, string> {
    protected registerListeners(actions: ActionsHub): void;
    protected getItemByKey(typeName: string): WorkItemType;
    private _onAdd(items);
    private _addItem(item);
}
