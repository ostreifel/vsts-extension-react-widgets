import * as React from "react";

import { BaseStore } from "../../Flux/Stores/BaseStore";
import { autobind } from "OfficeFabric/Utilities";
import { FluxContext } from "../../Flux/FluxContext";

export interface IBaseComponentProps {
    className?: string;
}

export interface IBaseComponentState {
    allStoresLoaded?: boolean;
}

export abstract class BaseComponent<TProps extends IBaseComponentProps, TState extends IBaseComponentState> extends React.Component<TProps, TState> {
    protected fluxContext: FluxContext;

    constructor(props: TProps, context?: any) {
        super(props, context);

        this.fluxContext = FluxContext.get();
        this.initializeState();
    }

    public componentDidMount() {
        const stores = this.getStoresToLoad() || [];
        for (const store of stores) {
            store.addChangedListener(this._onStoreChanged);
        }
        
        this.initialize();
    }

    public componentWillUnmount() {
        const stores = this.getStoresToLoad() || [];
        for (const store of stores) {
            store.removeChangedListener(this._onStoreChanged);
        }
    }

    protected getStoresToLoad(): BaseStore<any, any, any>[] {
        return null;
    }

    protected initialize(): void {

    }

    protected onStoreChanged(): void {

    }

    protected getDefaultClassName(): string {
        return "base-component";
    }

    protected getClassName(): string {
        if (this.props.className != null && this.props.className.trim() !== "") {
            return `${this.getDefaultClassName()} ${this.props.className}`;
        }
        else {
            return this.getDefaultClassName();
        }
    }

    protected initializeState(): void {
        this.state = {} as TState;
    }

    protected updateState(updatedStates: TState) {
        this.setState({...this.state as any, ...updatedStates as any});  // Typescript doesnt support spread for generic types yet. Thats why state object is cast to any
    }

    @autobind
    private _onStoreChanged() {
        const stores = this.getStoresToLoad() || [];
        let allStoresLoaded = true;
        for (const store of stores) {
            if (!store.isLoaded()) {
                allStoresLoaded = false;
                break;
            }
        }

        this.updateState({allStoresLoaded: allStoresLoaded} as TState);

        this.onStoreChanged();
    }
}