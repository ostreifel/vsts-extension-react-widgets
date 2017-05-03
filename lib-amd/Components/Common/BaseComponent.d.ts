/// <reference types="react" />
import * as React from "react";
import { BaseStore } from "../../Flux/Stores/BaseStore";
import { FluxContext } from "../../Flux/FluxContext";
export interface IBaseComponentState {
    allStoresLoaded?: boolean;
}
export declare abstract class BaseComponent<TProps, TState extends IBaseComponentState> extends React.Component<TProps, TState> {
    protected fluxContext: FluxContext;
    constructor(props: TProps, context?: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    protected getStoresToLoad(): BaseStore<any, any, any>[];
    protected initialize(): void;
    protected onStoreChanged(): void;
    protected getComponentKey(): string;
    protected initializeState(): void;
    protected getClassName(className?: string): string;
    protected updateState(updatedStates: TState): void;
    private _onStoreChanged();
}
