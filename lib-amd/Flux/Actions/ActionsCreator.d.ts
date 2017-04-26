import { Action } from "VSS/Flux/Action";
import { WorkItemField, WorkItemTemplateReference, WorkItemType, WorkItemTemplate } from "TFS/WorkItemTracking/Contracts";
import { IWorkItemFieldStore } from "../Stores/WorkItemFieldStore";
import { IWorkItemTypeStore } from "../Stores/WorkItemTypeStore";
import { IWorkItemTemplateStore } from "../Stores/WorkItemTemplateStore";
import { IWorkItemTemplateItemStore } from "../Stores/WorkItemTemplateItemStore";
import { IWorkItemColorStore } from "../Stores/WorkItemColorStore";
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
    private _workItemFieldDataProvider;
    private _workItemTemplateDataProvider;
    private _workItemTypeDataProvider;
    private _workItemTemplateItemDataProvider;
    private _workItemColorsDataProvider;
    constructor(_actionsHub: ActionsHub, _workItemFieldDataProvider: IWorkItemFieldStore, _workItemTemplateDataProvider: IWorkItemTemplateStore, _workItemTypeDataProvider: IWorkItemTypeStore, _workItemTemplateItemDataProvider: IWorkItemTemplateItemStore, _workItemColorsDataProvider: IWorkItemColorStore);
    initializeWorkItemFields(): Promise<void>;
    initializeWorkItemTemplates(): Promise<void>;
    initializeWorkItemTypes(): Promise<void>;
    initializeWorkItemColors(): Promise<void>;
    ensureTemplateItem(id: string): Promise<boolean>;
}
