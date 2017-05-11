import { WorkItemTemplate } from "TFS/WorkItemTracking/Contracts";
import { BaseStore } from "./BaseStore";
export interface IWorkItemTemplateItemStore {
    itemExists(id: string): boolean;
    getItem(id: string): WorkItemTemplate;
}
export declare class WorkItemTemplateItemStore extends BaseStore<WorkItemTemplate[], WorkItemTemplate, string> {
    constructor();
    protected getItemByKey(id: string): WorkItemTemplate;
    protected initializeItems(): Promise<void>;
    getKey(): string;
    ensureTemplateItem(id: string, teamId?: string): Promise<boolean>;
    private _onAdd(items);
    private _addItem(item);
}
