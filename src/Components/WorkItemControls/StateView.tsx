import "../../css/StateView.scss";

import * as React from "react";

import { Label } from "OfficeFabric/Label";

import { BaseComponent, IBaseComponentState, IBaseComponentProps } from "../Common/BaseComponent"; 
import { BaseStore, StoreFactory } from "../../Stores/BaseStore";
import { WorkItemColorStore } from "../../Stores/WorkItemColorStore";

export interface IStateViewProps extends IBaseComponentProps {
    state: string;
    workItemType: string;
}

export interface IStateViewState extends IBaseComponentState {
    
}

export class StateView extends BaseComponent<IStateViewProps, IStateViewState> {
    protected getStoresToLoad(): {new(): BaseStore<any, any, any>}[] {
        return [WorkItemColorStore];
    }

    protected initialize() {
        StoreFactory.getInstance<WorkItemColorStore>(WorkItemColorStore).initialize();
    }

    protected initializeState(): void {
        this.state = {
            
        };
    }

    protected getDefaultClassName(): string {
        return "work-item-state-view";
    }

    public render(): JSX.Element {
        const storeInstance = StoreFactory.getInstance<WorkItemColorStore>(WorkItemColorStore);
        let stateColor = storeInstance.isLoaded() ? storeInstance.getItem({workItemType: this.props.workItemType, stateName: this.props.state}) : "#FFFFFF";
        
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