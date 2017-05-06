import { WorkItemTemplateReference } from "TFS/WorkItemTracking/Contracts";
import { BaseStore } from "./BaseStore";
export declare class WorkItemTemplateStore extends BaseStore<WorkItemTemplateReference[], WorkItemTemplateReference, string> {
    protected getItemByKey(id: string): WorkItemTemplateReference;
    protected initializeItems(): Promise<void>;
    getKey(): string;
}
