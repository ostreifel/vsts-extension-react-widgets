import { BaseStore, StoreFactory } from "./BaseStore";
import { WorkItemTypeStore } from "./WorkItemTypeStore";
import { WorkItemStateColor, WorkItemType } from "TFS/WorkItemTracking/Contracts";
import * as WitClient from "TFS/WorkItemTracking/RestClient";

export interface WorkItemStateStoreKey {
    workItemType: string;
    stateName?: string;
}

export class WorkItemStateStore extends BaseStore<IDictionaryStringTo<{color: string, stateColors: IDictionaryStringTo<string>}>, string, WorkItemStateStoreKey> {
    protected getItemByKey(key: WorkItemStateStoreKey): string {
        const workItemType = this.items[key.workItemType];
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

    protected async initializeItems(): Promise<void> {
        let workItemTypeAndStateColors: IDictionaryStringTo<{color: string, stateColors: IDictionaryStringTo<string>}> = {};
        const projectId = VSS.getWebContext().project.id;
        
        const workItemTypeStore = StoreFactory.getInstance<WorkItemTypeStore>(WorkItemTypeStore);
        await workItemTypeStore.initialize();

        const workItemTypes = workItemTypeStore.getAll();
        workItemTypes.forEach((wit: WorkItemType) => workItemTypeAndStateColors[wit.name] = {
            color: wit.color,
            stateColors: {}
        });

        await Promise.all(workItemTypes.map(async (wit: WorkItemType) => {
            let stateColors = await WitClient.getClient().getWorkItemTypeStates(projectId, wit.name);
            stateColors.forEach((stateColor: WorkItemStateColor) => workItemTypeAndStateColors[wit.name].stateColors[stateColor.name] = stateColor.color);
        }));

        this.items = workItemTypeAndStateColors;
    }

    public getKey(): string {
        return "WorkItemStateStore";
    }
}