import Utils_String = require("VSS/Utils/String");
import Utils_Array = require("VSS/Utils/Array");
import { WorkItemField } from "TFS/WorkItemTracking/Contracts";
import * as WitClient from "TFS/WorkItemTracking/RestClient";

import { BaseStore } from "./BaseStore";

export class WorkItemFieldStore extends BaseStore<WorkItemField[], WorkItemField, string> {
    protected getItemByKey(refName: string): WorkItemField {
        return Utils_Array.first(this.items, (item: WorkItemField) => Utils_String.equals(item.referenceName, refName, true));
    }

    protected async initializeItems(): Promise<void> {
        this.items = await WitClient.getClient().getFields(VSS.getWebContext().project.id);
    }

    public getKey(): string {
        return "WorkItemFieldStore";
    }
}