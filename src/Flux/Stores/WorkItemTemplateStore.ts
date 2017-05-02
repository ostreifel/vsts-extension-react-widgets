import Utils_String = require("VSS/Utils/String");
import Utils_Array = require("VSS/Utils/Array");
import { WorkItemTemplateReference } from "TFS/WorkItemTracking/Contracts";

import { BaseStore } from "./BaseStore";
import { ActionsHub } from "../Actions/ActionsCreator";

export class WorkItemTemplateStore extends BaseStore<WorkItemTemplateReference[], WorkItemTemplateReference, string> {
    
    protected registerListeners(actions: ActionsHub): void {
        actions.InitializeWorkItemTemplates.addListener((items: WorkItemTemplateReference[]) => {
            if (!items) {
                this.emitChanged();
            }
            this._onAdd(items);
        });
    }

    protected getItemByKey(id: string): WorkItemTemplateReference {  
        return Utils_Array.first(this._items, (item: WorkItemTemplateReference) => Utils_String.equals(item.id, id, true));
    }

    private _onAdd(items: WorkItemTemplateReference | WorkItemTemplateReference[]): void {
        if (!items) {
            return;
        }

        if (!this._items) {
            this._items = [];
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

    private _addItem(item: WorkItemTemplateReference): void {
        let existingItemIndex = Utils_Array.findIndex(this._items, (existingItem: WorkItemTemplateReference) => Utils_String.equals(item.id, existingItem.id, true));
        if (existingItemIndex != -1) {
            // Overwrite the item data
            this._items[existingItemIndex] = item;
        }
        else {
            this._items.push(item);
        }
    }
}