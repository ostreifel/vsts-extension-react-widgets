import { Action } from "VSS/Flux/Action";
import { WorkItemType, WorkItemField, WorkItemTemplate, WorkItemTemplateReference, WorkItemStateColor } from "TFS/WorkItemTracking/Contracts";
export declare module WorkItemTypeActionsCreator {
    var InitializeWorkItemTypes: Action<WorkItemType[]>;
}
export declare module WorkItemFieldActionsCreator {
    var InitializeWorkItemFields: Action<WorkItemField[]>;
}
export declare module WorkItemTemplateActionsCreator {
    var InitializeWorkItemTemplates: Action<WorkItemTemplateReference[]>;
}
export declare module WorkItemTemplateItemActionsCreator {
    var InitializeWorkItemTemplateItem: Action<WorkItemTemplate>;
}
export declare module WorkItemStateItemActionsCreator {
    var InitializeWorkItemStateItems: Action<{
        witName: string;
        states: WorkItemStateColor[];
    }>;
}
