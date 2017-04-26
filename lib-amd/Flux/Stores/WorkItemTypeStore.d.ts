import { Store } from "VSS/Flux/Store";
import { WorkItemType } from "TFS/WorkItemTracking/Contracts";
import { ActionsHub } from "../Actions/ActionsCreator";
export interface IWorkItemTypeStore {
    isLoaded(): boolean;
    itemExists(typeName: string): boolean;
    getItem(typeName: string): WorkItemType;
    getAll(): WorkItemType[];
}
export declare class WorkItemTypeStore extends Store implements IWorkItemTypeStore {
    private _items;
    constructor(actions: ActionsHub);
    isLoaded(): boolean;
    itemExists(typeName: string): boolean;
    getItem(typeName: string): WorkItemType;
    getAll(): WorkItemType[];
    private _getByTypeName(typeName);
    private _onAdd(items);
    private _addItem(item);
}
