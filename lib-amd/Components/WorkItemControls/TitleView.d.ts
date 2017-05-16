/// <reference types="react" />
import "../../css/TitleView.scss";
import { BaseComponent, IBaseComponentState, IBaseComponentProps } from "../Common/BaseComponent";
import { BaseStore } from "../../Stores/BaseStore";
export interface ITitleViewProps extends IBaseComponentProps {
    title: string;
    workItemType: string;
    onClick?: () => void;
}
export declare class TitleView extends BaseComponent<ITitleViewProps, IBaseComponentState> {
    protected getStoresToLoad(): {
        new (): BaseStore<any, any, any>;
    }[];
    protected initialize(): void;
    protected initializeState(): void;
    protected getDefaultClassName(): string;
    render(): JSX.Element;
}
