import "../../css/TitleView.scss";

import * as React from "react";

import { Label } from "OfficeFabric/Label";

import { BaseComponent, IBaseComponentState, IBaseComponentProps } from "../Common/BaseComponent"; 
import { BaseStore, StoreFactory } from "../../Stores/BaseStore";
import { WorkItemColorStore } from "../../Stores/WorkItemColorStore";

export interface ITitleViewProps extends IBaseComponentProps {
    title: string;
    workItemType: string;
    onClick?: () => void;
}

export class TitleView extends BaseComponent<ITitleViewProps, IBaseComponentState> {
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
        return "work-item-title-view";
    }

    public render(): JSX.Element {
        const storeInstance = StoreFactory.getInstance<WorkItemColorStore>(WorkItemColorStore);
        let witColor = storeInstance.isLoaded() ? storeInstance.getItem({workItemType: this.props.workItemType}) : "#FFFFFF";

        return (
            <Label className={this.getClassName()} 
                style={{borderColor: witColor ? "#" + witColor : "#000"}}
                onClick={(e) => {
                    if (this.props.onClick) {
                        this.props.onClick();
                    }
                }}>

                {this.props.title}
            </Label>
        )
    }
}