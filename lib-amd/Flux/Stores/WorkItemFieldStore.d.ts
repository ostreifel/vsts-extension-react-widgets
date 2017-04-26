import { Store } from "VSS/Flux/Store";
import { WorkItemField } from "TFS/WorkItemTracking/Contracts";
import { ActionsHub } from "../Actions/ActionsCreator";
export interface IWorkItemFieldStore {
    isLoaded(): boolean;
    itemExists(refName: string): boolean;
    getItem(refName: string): WorkItemField;
    getAll(): WorkItemField[];
}
export declare class WorkItemFieldStore extends Store implements IWorkItemFieldStore {
    private _items;
    constructor(actions: ActionsHub);
    isLoaded(): boolean;
    itemExists(id: string): boolean;
    getItem(refName: string): WorkItemField;
    getAll(): WorkItemField[];
    private _getByRefName(refName);
    private _onAdd(items);
    private _addItem(item);
}
