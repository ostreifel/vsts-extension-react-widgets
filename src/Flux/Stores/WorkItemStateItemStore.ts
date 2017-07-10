import Utils_String = require("VSS/Utils/String");
import Utils_Array = require("VSS/Utils/Array");
import { WorkItemStateColor, WorkItemType } from "TFS/WorkItemTracking/Contracts";

import { BaseStore } from "./BaseStore";
import { WorkItemStateItemActionsCreator } from "../Actions/ActionsCreator";

export class WorkItemStateItemStore extends BaseStore<IDictionaryStringTo<WorkItemStateColor[]>, WorkItemStateColor[], string> {
    constructor() {
        super();
        this.items = {};    
    }

    public getItem(witName: string): WorkItemStateColor[] {
        return this.items[witName.toLowerCase()] || null;
    }

    protected initializeActionListeners() {
        WorkItemStateItemActionsCreator.InitializeWorkItemStateItems.addListener((stateItems: {witName: string, states: WorkItemStateColor[]}) => {
            if (stateItems) {               
                this.items[stateItems.witName.toLowerCase()] = stateItems.states;
            }

            this.emitChanged();
        });
    }    

    public getKey(): string {
        return "WorkItemStateItemStore";
    }

    protected convertItemKeyToString(key: string): string {
        return key;
    }
}