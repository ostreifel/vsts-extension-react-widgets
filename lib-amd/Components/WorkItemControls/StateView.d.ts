/// <reference types="react" />
import "../../css/StateView.scss";
import { BaseComponent, IBaseComponentState, IBaseComponentProps } from "../Common/BaseComponent";
import { BaseStore } from "../../Stores/BaseStore";
export interface IStateViewProps extends IBaseComponentProps {
    state: string;
    workItemType: string;
}
export interface IStateViewState extends IBaseComponentState {
}
export declare class StateView extends BaseComponent<IStateViewProps, IStateViewState> {
    protected getStoresToLoad(): {
        new (): BaseStore<any, any, any>;
    }[];
    protected initialize(): void;
    protected initializeState(): void;
    protected getDefaultClassName(): string;
    render(): JSX.Element;
}
