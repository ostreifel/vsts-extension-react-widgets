import "../../css/TitleView.scss";

import * as React from "react";

import { Label } from "OfficeFabric/Label";

import { BaseComponent, IBaseComponentState, IBaseComponentProps } from "../Common/BaseComponent"; 
import { BaseStore, StoreFactory } from "../../Stores/BaseStore";
import { WorkItemTypeStore } from "../../Stores/WorkItemTypeStore";

export interface ITitleViewProps extends IBaseComponentProps {
    title: string;
    workItemType: string;
    onClick?: () => void;
}

export class TitleView extends BaseComponent<ITitleViewProps, IBaseComponentState> {
    protected getStoresToLoad(): {new(): BaseStore<any, any, any>}[] {
        return [WorkItemTypeStore];
    }

    protected initialize() {
        StoreFactory.getInstance<WorkItemTypeStore>(WorkItemTypeStore).initialize();
    }

    protected initializeState(): void {
        this.state = {
            
        };
    }

    protected getDefaultClassName(): string {
        return "work-item-title-view";
    }

    public render(): JSX.Element {
        const storeInstance = StoreFactory.getInstance<WorkItemTypeStore>(WorkItemTypeStore);
        const wit = storeInstance.isLoaded() ? storeInstance.getItem(this.props.workItemType) : null;
        let witColor = wit ? wit.color : null;
        const witIcon = wit ? (wit as any).icon : null;
        let witIconUrl = (witIcon && witIcon.id) ? witIcon.url : null;

        if (witColor) {
            witColor = "#" + witColor.substring(witColor.length - 6);
        }
        else {
            witColor = "#000000";
        }
        
        return (            
            <Label className={`${this.getClassName()} ${(witIconUrl || !wit) ? "no-color" : ""}`}
                style={(witIconUrl || !wit) ? undefined : {borderColor: witColor}}
                onClick={(e) => {
                    if (this.props.onClick) {
                        this.props.onClick();
                    }
                }}>
                {witIconUrl && <img src={witIconUrl} />}
                {this.props.title}
            </Label>
        )
    }
}