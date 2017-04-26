import { WorkItemFieldStore } from "./WorkItemFieldStore";
import { WorkItemTemplateStore } from "./WorkItemTemplateStore";
import { WorkItemTemplateItemStore } from "./WorkItemTemplateItemStore";
import { WorkItemTypeStore } from "./WorkItemTypeStore";
import { WorkItemColorStore } from "./WorkItemColorStore";
import { ActionsHub } from "../Actions/ActionsCreator";
export declare class StoresHub {
    workItemFieldStore: WorkItemFieldStore;
    workItemTemplateStore: WorkItemTemplateStore;
    workItemTemplateItemStore: WorkItemTemplateItemStore;
    workItemTypeStore: WorkItemTypeStore;
    workItemColorStore: WorkItemColorStore;
    constructor(actions: ActionsHub);
}
