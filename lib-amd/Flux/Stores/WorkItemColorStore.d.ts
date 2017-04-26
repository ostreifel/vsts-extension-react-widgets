import { Store } from "VSS/Flux/Store";
import { ActionsHub } from "../Actions/ActionsCreator";
export interface IWorkItemColorStore {
    isLoaded(): boolean;
    itemExists(witName: string, stateName?: string): boolean;
    getWorkItemTypeColor(witName: string): string;
    getStateColor(witName: string, state: string): string;
    getAll(): IDictionaryStringTo<{
        color: string;
        stateColors: IDictionaryStringTo<string>;
    }>;
}
export declare class WorkItemColorStore extends Store implements IWorkItemColorStore {
    private _items;
    constructor(actions: ActionsHub);
    isLoaded(): boolean;
    itemExists(witName: string, stateName?: string): boolean;
    getWorkItemTypeColor(witName: string): string;
    getStateColor(witName: string, state: string): string;
    getAll(): IDictionaryStringTo<{
        color: string;
        stateColors: IDictionaryStringTo<string>;
    }>;
}
