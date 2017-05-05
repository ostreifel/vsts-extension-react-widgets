import "../../css/StateView.scss";

import * as React from "react";

import { Label } from "OfficeFabric/Label";

import { BaseComponent, IBaseComponentState, IBaseComponentProps } from "../Common/BaseComponent"; 
import { BaseStore } from "../../Flux/Stores/BaseStore";

export interface IStateViewProps extends IBaseComponentProps {
    state: string;
    workItemType: string;
}

export interface IStateViewState extends IBaseComponentState {
    
}

export class StateView extends BaseComponent<IStateViewProps, IStateViewState> {
    protected getStoresToLoad(): BaseStore<any, any, any>[] {
        return [this.fluxContext.stores.workItemColorStore];
    }

    protected initialize() {
        this.fluxContext.actionsCreator.initializeWorkItemColors();        
    }

    protected initializeState(): void {
        this.state = {
            
        };
    }

    protected getDefaultClassName(): string {
        return "work-item-state-view";
    }

    public render(): JSX.Element {
        let stateColor = this.fluxContext.stores.workItemColorStore.isLoaded() ? this.fluxContext.stores.workItemColorStore.getItem({workItemType: this.props.workItemType, stateName: this.props.state}) : "#FFFFFF";
        
        return (
            <Label className={this.getClassName()}>
                <span 
                    className="work-item-type-state-color" 
                    style={{
                        backgroundColor: "#" + stateColor,
                        borderColor: "#" + stateColor
                    }} 
                />
                <span className="state-name">{this.props.state}</span>
            </Label>
        )
    }
}