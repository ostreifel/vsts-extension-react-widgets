import { WorkItemTemplate } from "TFS/WorkItemTracking/Contracts";
import { BaseStore } from "./BaseStore";
import { ActionsHub } from "../Actions/ActionsCreator";
export interface IWorkItemTemplateItemStore {
    itemExists(id: string): boolean;
    getItem(id: string): WorkItemTemplate;
}
export declare class WorkItemTemplateItemStore extends BaseStore<WorkItemTemplate[], WorkItemTemplate, string> {
    constructor(actions: ActionsHub);
    protected registerListeners(actions: ActionsHub): void;
    protected getItemByKey(id: string): WorkItemTemplate;
    private _onAdd(items);
    private _addItem(item);
}
