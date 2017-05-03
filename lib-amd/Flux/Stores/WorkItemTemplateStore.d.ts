import { WorkItemTemplateReference } from "TFS/WorkItemTracking/Contracts";
import { BaseStore } from "./BaseStore";
import { ActionsHub } from "../Actions/ActionsCreator";
export declare class WorkItemTemplateStore extends BaseStore<WorkItemTemplateReference[], WorkItemTemplateReference, string> {
    protected registerListeners(actions: ActionsHub): void;
    protected getItemByKey(id: string): WorkItemTemplateReference;
    private _onAdd(items);
    private _addItem(item);
}
