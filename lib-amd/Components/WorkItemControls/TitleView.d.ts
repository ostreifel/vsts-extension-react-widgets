/// <reference types="react" />
import "../../css/TitleView.scss";
import { BaseComponent, IBaseComponentState, IBaseComponentProps } from "../Common/BaseComponent";
import { BaseStore } from "../../Flux/Stores/BaseStore";
export interface ITitleViewProps extends IBaseComponentProps {
    title: string;
    workItemType: string;
}
export interface ITitleViewState extends IBaseComponentState {
}
export declare class TitleView extends BaseComponent<ITitleViewProps, ITitleViewState> {
    protected getStoresToLoad(): BaseStore<any, any, any>[];
    protected initialize(): void;
    protected initializeState(): void;
    protected getDefaultClassName(): string;
    render(): JSX.Element;
}
