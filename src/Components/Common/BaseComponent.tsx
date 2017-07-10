import * as React from "react";

import { BaseStore } from "../../Flux/Stores/BaseStore";
import { autobind } from "OfficeFabric/Utilities";

export interface IBaseComponentProps {
    className?: string;
}

export interface IBaseComponentState {
    
}

export class BaseComponent<TProps extends IBaseComponentProps, TState extends IBaseComponentState> extends React.Component<TProps, TState> {
    constructor(props: TProps, context?: any) {
        super(props, context);

        this.initializeState();
    }

    public componentDidMount() {
        for (const store of this.getStores()) {
            store.addChangedListener(this.onStoreChanged);
        }
    }

    public componentWillUnmount() {
        for (const store of this.getStores()) {
            store.removeChangedListener(this.onStoreChanged);
        }
    }

    protected getStores(): BaseStore<any, any, any>[] {
        return [];
    }

    @autobind
    protected onStoreChanged(): void {
        var newStoreState = this.getStoresState();
        this.updateState(newStoreState);
    }

    protected getStoresState(): TState {
        return {} as TState;
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
}