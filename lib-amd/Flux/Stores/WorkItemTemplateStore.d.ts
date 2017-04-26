import { Store } from "VSS/Flux/Store";
import { WorkItemTemplateReference } from "TFS/WorkItemTracking/Contracts";
import { ActionsHub } from "../Actions/ActionsCreator";
export interface IWorkItemTemplateStore {
    isLoaded(): boolean;
    itemExists(id: string): boolean;
    getItem(id: string): WorkItemTemplateReference;
    getAll(): WorkItemTemplateReference[];
}
export declare class WorkItemTemplateStore extends Store implements IWorkItemTemplateStore {
    private _items;
    constructor(actions: ActionsHub);
    isLoaded(): boolean;
    itemExists(id: string): boolean;
    getItem(id: string): WorkItemTemplateReference;
    getAll(): WorkItemTemplateReference[];
    private _getById(id);
    private _onAdd(items);
    private _addItem(item);
}
