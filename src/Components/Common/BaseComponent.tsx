import * as React from "react";

import { BaseStore, StoreFactory } from "../../Stores/BaseStore";
import { autobind } from "OfficeFabric/Utilities";

export interface IBaseComponentProps {
    className?: string;
}

export interface IBaseComponentState {
    allStoresLoaded?: boolean;
}

export abstract class BaseComponent<TProps extends IBaseComponentProps, TState extends IBaseComponentState> extends React.Component<TProps, TState> {
    constructor(props: TProps, context?: any) {
        super(props, context);

        this.initializeState();
    }

    public componentDidMount() {
        const stores = this.getStoresToLoad() || [];
        for (const store of stores) {
            const instance = StoreFactory.getInstance(store);
            instance.addChangedListener(this._onStoreChanged);
        }
        
        this.initialize();
    }

    public componentWillUnmount() {
        const stores = this.getStoresToLoad() || [];
        for (const store of stores) {
            const instance = StoreFactory.getInstance(store);
            instance.removeChangedListener(this._onStoreChanged);
        }
    }

    protected getStoresToLoad(): {new(): BaseStore<any, any, any>}[] {
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

    protected updateState(updatedStates: TState, callback?: () => void) {
        this.setState({...this.state as any, ...updatedStates as any}, callback);  // Typescript doesnt support spread for generic types yet. Thats why state object is cast to any
    }

    @autobind
    private _onStoreChanged() {
        const stores = this.getStoresToLoad() || [];
        let allStoresLoaded = true;
        for (const store of stores) {
            const storeInstance = StoreFactory.getInstance(store);
            if (!storeInstance.isLoaded()) {
                allStoresLoaded = false;
                break;
            }
        }

        this.updateState({allStoresLoaded: allStoresLoaded} as TState);

        this.onStoreChanged();
    }
}