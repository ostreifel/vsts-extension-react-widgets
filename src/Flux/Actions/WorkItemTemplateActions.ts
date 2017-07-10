import { WorkItemTemplateReference } from "TFS/WorkItemTracking/Contracts";
import * as WitClient from "TFS/WorkItemTracking/RestClient";

import { StoreFactory } from "../Stores/BaseStore";
import { WorkItemTemplateStore } from "../Stores/WorkItemTemplateStore";
import { WorkItemTemplateActionsCreator } from "./ActionsCreator";

export module WorkItemTemplateActions {
    var witClient: WitClient.WorkItemTrackingHttpClient3_1 = WitClient.getClient();
    var workItemTemplateStore: WorkItemTemplateStore = StoreFactory.getInstance<WorkItemTemplateStore>(WorkItemTemplateStore);

    export async function initializeWorkItemTemplates() {
        if (workItemTemplateStore.isLoaded()) {
            WorkItemTemplateActionsCreator.InitializeWorkItemTemplates.invoke(null);
        }
        else if (!workItemTemplateStore.isLoading()) {
            workItemTemplateStore.setLoading(true);
            try {
                const workItemTemplates = await WitClient.getClient().getTemplates(VSS.getWebContext().project.id, VSS.getWebContext().team.id);
                workItemTemplateStore.setLoading(false);
                workItemTemplateStore.setError(null);

                WorkItemTemplateActionsCreator.InitializeWorkItemTemplates.invoke(workItemTemplates);
            }
            catch (e) {
                workItemTemplateStore.setLoading(false);
                workItemTemplateStore.setError(e.message || e);
            }
        }
    }
}