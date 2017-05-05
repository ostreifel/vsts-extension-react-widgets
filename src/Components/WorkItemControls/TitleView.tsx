import "../../css/TitleView.scss";

import * as React from "react";

import { Label } from "OfficeFabric/Label";

import { BaseComponent, IBaseComponentState, IBaseComponentProps } from "../Common/BaseComponent"; 
import { BaseStore } from "../../Flux/Stores/BaseStore";

export interface ITitleViewProps extends IBaseComponentProps {
    title: string;
    workItemType: string;
}

export interface ITitleViewState extends IBaseComponentState {
    
}

export class TitleView extends BaseComponent<ITitleViewProps, ITitleViewState> {
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
        return "work-item-title-view";
    }

    public render(): JSX.Element {
        let witColor = this.fluxContext.stores.workItemColorStore.isLoaded() ? this.fluxContext.stores.workItemColorStore.getItem({workItemType: this.props.workItemType}) : "#FFFFFF";
        return (
            <Label className={this.getClassName()} style={{borderColor: witColor ? "#" + witColor : "#000"}}>
                {this.props.title}
            </Label>
        )
    }
}