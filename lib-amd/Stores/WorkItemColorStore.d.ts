import { BaseStore } from "./BaseStore";
export interface WorkItemColorStoreKey {
    workItemType: string;
    stateName?: string;
}
export declare class WorkItemColorStore extends BaseStore<IDictionaryStringTo<{
    color: string;
    stateColors: IDictionaryStringTo<string>;
}>, string, WorkItemColorStoreKey> {
    protected getItemByKey(key: WorkItemColorStoreKey): string;
    protected initializeItems(): Promise<void>;
    getKey(): string;
}
