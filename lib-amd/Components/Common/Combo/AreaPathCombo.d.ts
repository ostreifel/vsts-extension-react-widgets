/// <reference types="react" />
import { BaseComponent, IBaseComponentProps, IBaseComponentState } from "../BaseComponent";
import { BaseStore } from "../../../Stores/BaseStore";
import { TreeNode } from "VSS/Controls/TreeView";
export interface IAreaPathComboProps extends IBaseComponentProps {
    value?: string;
    onChange: (newValue: string) => void;
}
export interface IAreaPathComboState extends IBaseComponentState {
    treeNodes?: TreeNode;
}
export declare class AreaPathCombo extends BaseComponent<IAreaPathComboProps, IAreaPathComboState> {
    protected getDefaultClassName(): string;
    protected getStoresToLoad(): {
        new (): BaseStore<any, any, any>;
    }[];
    protected initialize(): void;
    protected onStoreChanged(): void;
    protected initializeState(): void;
    render(): JSX.Element;
    private _getTreeNode(node, uiNode, level);
}
