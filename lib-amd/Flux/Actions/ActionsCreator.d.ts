import { Action } from "VSS/Flux/Action";
import { WorkItemField, WorkItemTemplateReference, WorkItemType, WorkItemTemplate } from "TFS/WorkItemTracking/Contracts";
import { WorkItemFieldStore } from "../Stores/WorkItemFieldStore";
import { WorkItemTypeStore } from "../Stores/WorkItemTypeStore";
import { WorkItemTemplateStore } from "../Stores/WorkItemTemplateStore";
import { WorkItemTemplateItemStore } from "../Stores/WorkItemTemplateItemStore";
import { WorkItemColorStore } from "../Stores/WorkItemColorStore";
export declare class ActionsHub {
    InitializeWorkItemFields: Action<WorkItemField[]>;
    InitializeWorkItemTemplates: Action<WorkItemTemplateReference[]>;
    InitializeWorkItemTypes: Action<WorkItemType[]>;
    InitializeWorkItemColors: Action<IDictionaryStringTo<{
        color: string;
        stateColors: IDictionaryStringTo<string>;
    }>>;
    WorkItemTemplateItemAdded: Action<WorkItemTemplate | WorkItemTemplate[]>;
}
export declare class ActionsCreator {
    private _actionsHub;
    private _workItemFieldStore;
    private _workItemTemplateStore;
    private _workItemTypeStore;
    private _workItemTemplateItemStore;
    private _workItemColorsStore;
    constructor(_actionsHub: ActionsHub, _workItemFieldStore: WorkItemFieldStore, _workItemTemplateStore: WorkItemTemplateStore, _workItemTypeStore: WorkItemTypeStore, _workItemTemplateItemStore: WorkItemTemplateItemStore, _workItemColorsStore: WorkItemColorStore);
    initializeWorkItemFields(): Promise<void>;
    initializeWorkItemTemplates(): Promise<void>;
    initializeWorkItemTypes(): Promise<void>;
    initializeWorkItemColors(): Promise<void>;
    ensureTemplateItem(id: string): Promise<boolean>;
}
