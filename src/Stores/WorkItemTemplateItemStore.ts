import Utils_String = require("VSS/Utils/String");
import Utils_Array = require("VSS/Utils/Array");
import { WorkItemTemplate } from "TFS/WorkItemTracking/Contracts";
import * as WitClient from "TFS/WorkItemTracking/RestClient";

import { BaseStore } from "./BaseStore";

export interface IWorkItemTemplateItemStore {
    itemExists(id: string): boolean;
    getItem(id: string): WorkItemTemplate;
}

export class WorkItemTemplateItemStore extends BaseStore<WorkItemTemplate[], WorkItemTemplate, string> {
    constructor() {
        super();
        this.items = [];    
    }

    protected getItemByKey(id: string): WorkItemTemplate {
         return Utils_Array.first(this.items, (item: WorkItemTemplate) => Utils_String.equals(item.id, id, true));
    }

    protected async initializeItems(): Promise<void> {
        return;
    }

    public getKey(): string {
        return "WorkItemTemplateItemStore";
    }    

    public async ensureTemplateItem(id: string): Promise<boolean> {
        if (!this.itemExists(id)) {
            try {
                let template = await WitClient.getClient().getTemplate(VSS.getWebContext().project.id, VSS.getWebContext().team.id, id)
                if (template) {
                    this._onAdd(template);
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

    private _onAdd(items: WorkItemTemplate | WorkItemTemplate[]): void {
        if (!items) {
            return;
        }

        if (!this.items) {
            this.items = [];
        }

        if (Array.isArray(items)) {
            for (let item of items) {
                this._addItem(item);
            }
        }
        else {
            this._addItem(items);
        }

        this.emitChanged();
    }

    private _addItem(item: WorkItemTemplate): void {
        let existingItemIndex = Utils_Array.findIndex(this.items, (existingItem: WorkItemTemplate) => Utils_String.equals(item.id, existingItem.id, true));
        if (existingItemIndex != -1) {
            // Overwrite the item data
            this.items[existingItemIndex] = item;
        }
        else {
            this.items.push(item);
        }
    }
}