import * as WitClient from "TFS/WorkItemTracking/RestClient";

import { StoreFactory } from "../Stores/BaseStore";
import { WorkItemTypeStore } from "../Stores/WorkItemTypeStore";
import { WorkItemTypeActionsCreator } from "./ActionsCreator";

export module WorkItemTypeActions {
    var workItemTypeStore: WorkItemTypeStore = StoreFactory.getInstance<WorkItemTypeStore>(WorkItemTypeStore);

    export async function initializeWorkItemTypes() {
        if (workItemTypeStore.isLoaded()) {
            WorkItemTypeActionsCreator.InitializeWorkItemTypes.invoke(null);
        }
        else if (!workItemTypeStore.isLoading()) {
            workItemTypeStore.setLoading(true);
            try {
                const workItemTypes = await WitClient.getClient().getWorkItemTypes(VSS.getWebContext().project.id);
                WorkItemTypeActionsCreator.InitializeWorkItemTypes.invoke(workItemTypes);
                workItemTypeStore.setLoading(false);
            }
            catch (e) {
                workItemTypeStore.setLoading(false);
                throw e.message;
            }
        }
    }
}