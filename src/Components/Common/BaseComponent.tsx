import * as React from "react";

import { BaseStore } from "../../Flux/Stores/BaseStore";
import { autobind } from "OfficeFabric/Utilities";
import { FluxContext } from "../../Flux/FluxContext";

export interface BaseComponentState {
    allStoresLoaded?: boolean;
}

export abstract class BaseComponent<TP, TS extends BaseComponentState> extends React.Component<TP, TS> {
    protected fluxContext: FluxContext;

    constructor(props: TP, context?: any) {
        super(props, context);

        this.fluxContext = FluxContext.get();
        this.initializeState();
    }

    private _updateState(updatedStates: TS) {
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

        this._updateState({allStoresLoaded: allStoresLoaded} as TS);

        this.onStoreChanged();
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

    protected initializeState() {
        
    }
}