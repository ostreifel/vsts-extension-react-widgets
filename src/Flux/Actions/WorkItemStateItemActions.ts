import { WorkItemTemplate } from "TFS/WorkItemTracking/Contracts";
import * as WitClient from "TFS/WorkItemTracking/RestClient";

import { StoreFactory } from "../Stores/BaseStore";
import { WorkItemStateItemStore } from "../Stores/WorkItemStateItemStore";
import { WorkItemStateItemActionsCreator } from "./ActionsCreator";

export module WorkItemStateItemActions {
    var workItemStateItemStore: WorkItemStateItemStore = StoreFactory.getInstance<WorkItemStateItemStore>(WorkItemStateItemStore);

    export async function initializeWorkItemStates(workItemTypeName: string) {
        if (workItemStateItemStore.isLoaded(workItemTypeName)) {
            WorkItemStateItemActionsCreator.InitializeWorkItemStateItems.invoke(null);
        }
        else if (!workItemStateItemStore.isLoading(workItemTypeName)) {
            workItemStateItemStore.setLoading(true, workItemTypeName);
            try {
                const workItemTypeStates = await WitClient.getClient().getWorkItemTypeStates(VSS.getWebContext().project.id, workItemTypeName);
                workItemStateItemStore.setLoading(false, workItemTypeName);
                workItemStateItemStore.setError(null, workItemTypeName);

                WorkItemStateItemActionsCreator.InitializeWorkItemStateItems.invoke({witName: workItemTypeName, states: workItemTypeStates});
            }
            catch (e) {
                workItemStateItemStore.setLoading(false, workItemTypeName);
                workItemStateItemStore.setError(e.message || e, workItemTypeName);
            }
        }
    }
}