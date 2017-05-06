import { WorkItemType } from "TFS/WorkItemTracking/Contracts";
import { BaseStore } from "./BaseStore";
export declare class WorkItemTypeStore extends BaseStore<WorkItemType[], WorkItemType, string> {
    protected getItemByKey(typeName: string): WorkItemType;
    protected initializeItems(): Promise<void>;
    getKey(): string;
}
