import Utils_String = require("VSS/Utils/String");
import Utils_Array = require("VSS/Utils/Array");
import { WorkItemField } from "TFS/WorkItemTracking/Contracts";

import { BaseStore } from "./BaseStore";
import { ActionsHub } from "../Actions/ActionsCreator";

export class WorkItemFieldStore extends BaseStore<WorkItemField[], WorkItemField, string> {
    
    protected registerListeners(actions: ActionsHub): void {        
        actions.InitializeWorkItemFields.addListener((items: WorkItemField[]) => {
            if (!items) {
                this.emitChanged();
            }
            this._onAdd(items);
        });
    }

    protected getItemByKey(refName: string): WorkItemField {
        return Utils_Array.first(this.items, (item: WorkItemField) => Utils_String.equals(item.referenceName, refName, true));
    }

    private _onAdd(items: WorkItemField | WorkItemField[]): void {
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

    private _addItem(item: WorkItemField): void {
        let existingItemIndex = Utils_Array.findIndex(this.items, (existingItem: WorkItemField) => Utils_String.equals(item.referenceName, existingItem.referenceName, true));
        if (existingItemIndex != -1) {
            // Overwrite the item data
            this.items[existingItemIndex] = item;
        }
        else {
            this.items.push(item);
        }
    }
}