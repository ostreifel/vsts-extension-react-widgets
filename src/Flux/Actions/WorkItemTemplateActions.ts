import * as WitClient from "TFS/WorkItemTracking/RestClient";

import { StoreFactory } from "../Stores/BaseStore";
import { WorkItemTemplateStore } from "../Stores/WorkItemTemplateStore";
import { WorkItemTemplateActionsCreator } from "./ActionsCreator";

export module WorkItemTemplateActions {
    var workItemTemplateStore: WorkItemTemplateStore = StoreFactory.getInstance<WorkItemTemplateStore>(WorkItemTemplateStore);

    export async function initializeWorkItemTemplates() {
        if (workItemTemplateStore.isLoaded()) {
            WorkItemTemplateActionsCreator.InitializeWorkItemTemplates.invoke(null);
        }
        else if (!workItemTemplateStore.isLoading()) {
            workItemTemplateStore.setLoading(true);
            try {
                const workItemTemplates = await WitClient.getClient().getTemplates(VSS.getWebContext().project.id, VSS.getWebContext().team.id);
                WorkItemTemplateActionsCreator.InitializeWorkItemTemplates.invoke(workItemTemplates);
                workItemTemplateStore.setLoading(false);
            }
            catch (e) {
                workItemTemplateStore.setLoading(false);
                throw e;
            }
        }
    }
}