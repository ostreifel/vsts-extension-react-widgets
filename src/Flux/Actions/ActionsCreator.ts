import { Action } from "VSS/Flux/Action";
import { WorkItemField, WorkItemTemplateReference, WorkItemStateColor, WorkItemType, WorkItemTemplate } from "TFS/WorkItemTracking/Contracts";

import { WorkItemFieldStore } from "../Stores/WorkItemFieldStore";
import { WorkItemTypeStore } from "../Stores/WorkItemTypeStore";
import { WorkItemTemplateStore } from "../Stores/WorkItemTemplateStore";
import { WorkItemTemplateItemStore } from "../Stores/WorkItemTemplateItemStore";
import { WorkItemColorStore } from "../Stores/WorkItemColorStore";

import * as WitClient from "TFS/WorkItemTracking/RestClient";

export class ActionsHub {    
    public InitializeWorkItemFields = new Action<WorkItemField[]>();
    public InitializeWorkItemTemplates = new Action<WorkItemTemplateReference[]>();
    public InitializeWorkItemTypes = new Action<WorkItemType[]>();
    public InitializeWorkItemColors = new Action<IDictionaryStringTo<{color: string, stateColors: IDictionaryStringTo<string>}>>();

    public WorkItemTemplateItemAdded = new Action<WorkItemTemplate | WorkItemTemplate[]>();
}

export class ActionsCreator {
    constructor(
        private _actionsHub: ActionsHub, 
        private _workItemFieldStore: WorkItemFieldStore,
        private _workItemTemplateStore: WorkItemTemplateStore,
        private _workItemTypeStore: WorkItemTypeStore,
        private _workItemTemplateItemStore: WorkItemTemplateItemStore,
        private _workItemColorsStore: WorkItemColorStore) {
    }

    public async initializeWorkItemFields() {
        if (this._workItemFieldStore.isLoaded()) {
            // Do nothing if query hierarchy data is already loaded
            this._actionsHub.InitializeWorkItemFields.invoke(null);
        }
        else if (!this._workItemFieldStore.isLoading()) {
            this._workItemFieldStore.setLoading(true);
            let fields = await WitClient.getClient().getFields(VSS.getWebContext().project.id);
            this._workItemFieldStore.setLoading(false);

            this._actionsHub.InitializeWorkItemFields.invoke(fields);
        }
    }

    public async initializeWorkItemTemplates() {
        if (this._workItemTemplateStore.isLoaded()) {
            // Do nothing if query hierarchy data is already loaded
            this._actionsHub.InitializeWorkItemTemplates.invoke(null);
        }
        else if (!this._workItemTemplateStore.isLoading()) {
            this._workItemTemplateStore.setLoading(true);
            let templates = await WitClient.getClient().getTemplates(VSS.getWebContext().project.id, VSS.getWebContext().team.id);
            this._workItemTemplateStore.setLoading(false);

            this._actionsHub.InitializeWorkItemTemplates.invoke(templates);
        }
    }

    public async initializeWorkItemTypes() {
        if (this._workItemTypeStore.isLoaded()) {
            // Do nothing if query hierarchy data is already loaded
            this._actionsHub.InitializeWorkItemTypes.invoke(null);
        }
        else if (!this._workItemTypeStore.isLoading()) {
            this._workItemTypeStore.setLoading(true);
            let workItemTypes = await WitClient.getClient().getWorkItemTypes(VSS.getWebContext().project.id);
            this._workItemTypeStore.setLoading(false);

            this._actionsHub.InitializeWorkItemTypes.invoke(workItemTypes);
        }
    }
    
    public async initializeWorkItemColors() {
        if (this._workItemColorsStore.isLoaded()) {
            // Do nothing if query hierarchy data is already loaded
            this._actionsHub.InitializeWorkItemColors.invoke(null);
        }
        else if (!this._workItemColorsStore.isLoading()) {
            this._workItemColorsStore.setLoading(true);

            let workItemTypeAndStateColors: IDictionaryStringTo<{color: string, stateColors: IDictionaryStringTo<string>}> = {};
            const projectId = VSS.getWebContext().project.id;
            
            await this.initializeWorkItemTypes();
            const workItemTypes = this._workItemTypeStore.getAll();
            workItemTypes.forEach((wit: WorkItemType) => workItemTypeAndStateColors[wit.name] = {
                color: wit.color,
                stateColors: {}
            });

            await Promise.all(workItemTypes.map(async (wit: WorkItemType) => {
                let stateColors = await WitClient.getClient().getWorkItemTypeStates(projectId, wit.name);
                stateColors.forEach((stateColor: WorkItemStateColor) => workItemTypeAndStateColors[wit.name].stateColors[stateColor.name] = stateColor.color);
            }));

            this._workItemColorsStore.setLoading(false);

            this._actionsHub.InitializeWorkItemColors.invoke(workItemTypeAndStateColors);
        }
    }

    public async ensureTemplateItem(id: string): Promise<boolean> {
        if (!this._workItemTemplateItemStore.itemExists(id)) {
            try {
                let template = await WitClient.getClient().getTemplate(VSS.getWebContext().project.id, VSS.getWebContext().team.id, id)
                if (template) {
                    this._actionsHub.WorkItemTemplateItemAdded.invoke(template);
                    return true;
                }
            }
            catch (e) {
                return false;
            }

            return false;
        }
        else {
            return true;
        }
    }
}
