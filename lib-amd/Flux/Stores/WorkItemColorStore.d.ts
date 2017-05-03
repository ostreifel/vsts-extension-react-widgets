import { BaseStore } from "./BaseStore";
import { ActionsHub } from "../Actions/ActionsCreator";
export interface WorkItemColorStoreKey {
    workItemType: string;
    stateName?: string;
}
export declare class WorkItemColorStore extends BaseStore<IDictionaryStringTo<{
    color: string;
    stateColors: IDictionaryStringTo<string>;
}>, string, WorkItemColorStoreKey> {
    protected registerListeners(actions: ActionsHub): void;
    protected getItemByKey(key: WorkItemColorStoreKey): string;
}
