import { WorkItemField } from "TFS/WorkItemTracking/Contracts";
import { BaseStore } from "./BaseStore";
export declare class WorkItemFieldStore extends BaseStore<WorkItemField[], WorkItemField, string> {
    protected getItemByKey(refName: string): WorkItemField;
    protected initializeItems(): Promise<void>;
    getKey(): string;
}
