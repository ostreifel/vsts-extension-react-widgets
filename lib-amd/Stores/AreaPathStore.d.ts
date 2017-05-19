import { WorkItemClassificationNode } from "TFS/WorkItemTracking/Contracts";
import { BaseStore } from "./BaseStore";
export declare class AreaPathStore extends BaseStore<IDictionaryStringTo<WorkItemClassificationNode>, WorkItemClassificationNode, string> {
    private _allowedAreaPaths;
    constructor();
    protected getItemByKey(projectId: string): WorkItemClassificationNode;
    protected initializeItems(): Promise<void>;
    getAreaPaths(projectId?: string): string[];
    ensureAreaPathNode(projectId?: string): Promise<boolean>;
    getKey(): string;
    private _onAdd(item, projectId);
    private _getNodePaths(node, parentNodeName?);
}
