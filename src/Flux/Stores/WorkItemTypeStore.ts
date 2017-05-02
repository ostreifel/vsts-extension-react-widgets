import Utils_String = require("VSS/Utils/String");
import Utils_Array = require("VSS/Utils/Array");
import { WorkItemType } from "TFS/WorkItemTracking/Contracts";

import { BaseStore } from "./BaseStore";
import { ActionsHub } from "../Actions/ActionsCreator";

export class WorkItemTypeStore extends BaseStore<WorkItemType[], WorkItemType, string> {
    
    protected registerListeners(actions: ActionsHub): void {
        actions.InitializeWorkItemTypes.addListener((items: WorkItemType[]) => {
            if (!items) {
                this.emitChanged();
            }
            this._onAdd(items);
        });
    }    

    protected getItemByKey(typeName: string): WorkItemType {
        return Utils_Array.first(this._items, (item: WorkItemType) => Utils_String.equals(item.name, typeName, true));
    }

    private _onAdd(items: WorkItemType | WorkItemType[]): void {
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

    private _addItem(item: WorkItemType): void {
        let existingItemIndex = Utils_Array.findIndex(this._items, (existingItem: WorkItemType) => Utils_String.equals(item.name, existingItem.name, true));
        if (existingItemIndex != -1) {
            // Overwrite the item data
            this._items[existingItemIndex] = item;
        }
        else {
            this._items.push(item);
        }
    }
}