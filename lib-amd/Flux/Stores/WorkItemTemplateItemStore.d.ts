import { Store } from "VSS/Flux/Store";
import { WorkItemTemplate } from "TFS/WorkItemTracking/Contracts";
import { ActionsHub } from "../Actions/ActionsCreator";
export interface IWorkItemTemplateItemStore {
    itemExists(id: string): boolean;
    getItem(id: string): WorkItemTemplate;
}
export declare class WorkItemTemplateItemStore extends Store implements IWorkItemTemplateItemStore {
    private _items;
    constructor(actions: ActionsHub);
    itemExists(id: string): boolean;
    getItem(id: string): WorkItemTemplate;
    private _getById(id);
    private _onAdd(items);
    private _addItem(item);
}
