import { WorkItemTemplateReference } from "TFS/WorkItemTracking/Contracts";
import { BaseStore } from "./BaseStore";
export declare class WorkItemTemplateStore extends BaseStore<WorkItemTemplateReference[], WorkItemTemplateReference, string> {
    getItem(id: string): WorkItemTemplateReference;
    protected initializeActionListeners(): void;
    getKey(): string;
    protected convertItemKeyToString(key: string): string;
}
