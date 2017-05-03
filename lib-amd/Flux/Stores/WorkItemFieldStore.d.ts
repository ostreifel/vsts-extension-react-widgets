import { WorkItemField } from "TFS/WorkItemTracking/Contracts";
import { BaseStore } from "./BaseStore";
import { ActionsHub } from "../Actions/ActionsCreator";
export declare class WorkItemFieldStore extends BaseStore<WorkItemField[], WorkItemField, string> {
    protected registerListeners(actions: ActionsHub): void;
    protected getItemByKey(refName: string): WorkItemField;
    private _onAdd(items);
    private _addItem(item);
}
