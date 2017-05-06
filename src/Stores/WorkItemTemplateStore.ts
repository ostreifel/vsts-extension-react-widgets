import Utils_String = require("VSS/Utils/String");
import Utils_Array = require("VSS/Utils/Array");
import { WorkItemTemplateReference } from "TFS/WorkItemTracking/Contracts";
import * as WitClient from "TFS/WorkItemTracking/RestClient";

import { BaseStore } from "./BaseStore";

export class WorkItemTemplateStore extends BaseStore<WorkItemTemplateReference[], WorkItemTemplateReference, string> {
    protected getItemByKey(id: string): WorkItemTemplateReference {  
        return Utils_Array.first(this.items, (item: WorkItemTemplateReference) => Utils_String.equals(item.id, id, true));
    }

    protected async initializeItems(): Promise<void> {
        this.items = await WitClient.getClient().getTemplates(VSS.getWebContext().project.id, VSS.getWebContext().team.id);
    }

    public getKey(): string {
        return "WorkItemTemplateStore";
    }
}