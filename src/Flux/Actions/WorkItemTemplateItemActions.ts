import * as WitClient from "TFS/WorkItemTracking/RestClient";

import { StoreFactory } from "../Stores/BaseStore";
import { WorkItemTemplateItemStore } from "../Stores/WorkItemTemplateItemStore";
import { WorkItemTemplateItemActionsCreator } from "./ActionsCreator";

export module WorkItemTemplateItemActions {
    var workItemTemplateItemStore: WorkItemTemplateItemStore = StoreFactory.getInstance<WorkItemTemplateItemStore>(WorkItemTemplateItemStore);

    export async function initializeWorkItemTemplateItem(teamId: string, id: string) {
        if (workItemTemplateItemStore.isLoaded(id)) {
            WorkItemTemplateItemActionsCreator.InitializeWorkItemTemplateItem.invoke(null);
        }
        else if (!workItemTemplateItemStore.isLoading(id)) {
            workItemTemplateItemStore.setLoading(true, id);
            try {
                const workItemTemplate = await WitClient.getClient().getTemplate(VSS.getWebContext().project.id, teamId, id);
                WorkItemTemplateItemActionsCreator.InitializeWorkItemTemplateItem.invoke(workItemTemplate);
                workItemTemplateItemStore.setLoading(false, id);
            }
            catch (e) {
                workItemTemplateItemStore.setLoading(false, id);
                throw e;
            }
        }
    }
}