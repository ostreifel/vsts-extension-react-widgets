import { WorkItemField } from "TFS/WorkItemTracking/Contracts";
import * as WitClient from "TFS/WorkItemTracking/RestClient";

import { StoreFactory } from "../Stores/BaseStore";
import { WorkItemFieldStore } from "../Stores/WorkItemFieldStore";
import { WorkItemFieldActionsCreator } from "./ActionsCreator";

export module WorkItemFieldActions {
    var workItemFieldStore: WorkItemFieldStore = StoreFactory.getInstance<WorkItemFieldStore>(WorkItemFieldStore);

    export async function initializeWorkItemFields() {
        if (workItemFieldStore.isLoaded()) {
            WorkItemFieldActionsCreator.InitializeWorkItemFields.invoke(null);
        }
        else if (!workItemFieldStore.isLoading()) {
            workItemFieldStore.setLoading(true);
            try {
                const workItemFields = await WitClient.getClient().getFields(VSS.getWebContext().project.id);
                workItemFieldStore.setLoading(false);
                workItemFieldStore.setError(null);

                WorkItemFieldActionsCreator.InitializeWorkItemFields.invoke(workItemFields);
            }
            catch (e) {
                workItemFieldStore.setLoading(false);
                workItemFieldStore.setError(e.message || e);
            }
        }
    }
}