import Utils_String = require("VSS/Utils/String");
import Utils_Array = require("VSS/Utils/Array");
import { WorkItemType } from "TFS/WorkItemTracking/Contracts";
import * as WitClient from "TFS/WorkItemTracking/RestClient";

import { BaseStore } from "./BaseStore";

export class WorkItemTypeStore extends BaseStore<WorkItemType[], WorkItemType, string> {
    protected getItemByKey(typeName: string): WorkItemType {
        return Utils_Array.first(this.items, (item: WorkItemType) => Utils_String.equals(item.name, typeName, true));
    }

    protected async initializeItems(): Promise<void> {
        this.items = await WitClient.getClient().getWorkItemTypes(VSS.getWebContext().project.id);
    }

    public getKey(): string {
        return "WorkItemTypeStore";
    }
}