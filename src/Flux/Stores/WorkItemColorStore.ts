import { BaseStore } from "./BaseStore";
import { ActionsHub } from "../Actions/ActionsCreator";

export interface WorkItemColorStoreKey {
    workItemType: string;
    stateName?: string;
}

export class WorkItemColorStore extends BaseStore<IDictionaryStringTo<{color: string, stateColors: IDictionaryStringTo<string>}>, string, WorkItemColorStoreKey> {

    protected registerListeners(actions: ActionsHub): void {
        actions.InitializeWorkItemColors.addListener((items: IDictionaryStringTo<{color: string, stateColors: IDictionaryStringTo<string>}>) => {            
            if (items) {
                this._items = items;
            }
            this.emitChanged();          
        });
    }

    protected getItemByKey(key: WorkItemColorStoreKey): string {
        const workItemType = this._items[key.workItemType];
        if (workItemType) {
            if (key.stateName) {
                return workItemType.stateColors[key.stateName];
            }
            else {
                return workItemType.color;
            }
        }
        else {
            return null;
        }
    }
}