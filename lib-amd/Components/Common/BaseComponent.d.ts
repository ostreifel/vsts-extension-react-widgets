/// <reference types="react" />
import * as React from "react";
import { BaseStore } from "../../Stores/BaseStore";
export interface IBaseComponentProps {
    className?: string;
}
export interface IBaseComponentState {
    allStoresLoaded?: boolean;
}
export declare abstract class BaseComponent<TProps extends IBaseComponentProps, TState extends IBaseComponentState> extends React.Component<TProps, TState> {
    constructor(props: TProps, context?: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    protected getStoresToLoad(): {
        new (): BaseStore<any, any, any>;
    }[];
    protected initialize(): void;
    protected onStoreChanged(): void;
    protected getDefaultClassName(): string;
    protected getClassName(): string;
    protected initializeState(): void;
    protected updateState(updatedStates: TState, callback?: () => void): void;
    private _onStoreChanged();
}
