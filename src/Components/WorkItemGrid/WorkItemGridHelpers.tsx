import * as React from "react";

import { WorkItem, WorkItemField, FieldType } from "TFS/WorkItemTracking/Contracts";
import { WorkItemFormNavigationService } from "TFS/WorkItemTracking/Services";
import Utils_String = require("VSS/Utils/String");

import { TooltipHost, TooltipDelay, DirectionalHint, TooltipOverflowMode } from "OfficeFabric/Tooltip";
import { IColumn } from "OfficeFabric/DetailsList";
import { Label } from "OfficeFabric/Label";

import { SortOrder } from "./WorkItemGrid.Props";
import { IdentityView } from "../Common/IdentityView";

export interface workItemFieldCellRendererOptions {
    workItemTypeAndStateColors?: IDictionaryStringTo<{color: string, stateColors: IDictionaryStringTo<string>}>;
}

export function workItemFieldValueComparer(w1: WorkItem, w2: WorkItem, fieldRefName: string, sortOrder: SortOrder): number {
    if (Utils_String.equals(fieldRefName, "System.Id", true)) {
        return sortOrder === SortOrder.DESC ? ((w1.id > w2.id) ? -1 : 1) : ((w1.id > w2.id) ? 1 : -1);
    }            
    else {
        let v1 = w1.fields[fieldRefName];
        let v2 = w2.fields[fieldRefName];
        return sortOrder === SortOrder.DESC ? -1 * Utils_String.ignoreCaseComparer(v1, v2) : Utils_String.ignoreCaseComparer(v1, v2);
    }
}

export function workItemFieldCellRenderer(item: WorkItem, index: number, column: IColumn, extraData?: workItemFieldCellRendererOptions): JSX.Element {
    let text: string = item.fields[column.fieldName];
    let className = "work-item-grid-cell";
    let innerElement: JSX.Element;
    
    switch (column.fieldName.toLowerCase()) {
        case "system.id":  
            text = item.id.toString();
            innerElement = <Label className={className}>{text}</Label>;            
            break;
        case "system.title":
            let witColor = extraData && extraData.workItemTypeAndStateColors && 
                        extraData.workItemTypeAndStateColors[item.fields["System.WorkItemType"]] && 
                        extraData.workItemTypeAndStateColors[item.fields["System.WorkItemType"]].color;
            innerElement = (
                <Label 
                    className={`${className} title-cell`}
                    onClick={(e) => openWorkItemDialog(e, item)}
                    style={{borderColor: witColor ? "#" + witColor : "#000"}}>

                    {item.fields[column.fieldName]}
                </Label>
            );
            break;
        case "system.state":
            innerElement = (
                <Label className={`${className} state-cell`}>
                    {
                        extraData &&
                        extraData.workItemTypeAndStateColors &&
                        extraData.workItemTypeAndStateColors[item.fields["System.WorkItemType"]] &&
                        extraData.workItemTypeAndStateColors[item.fields["System.WorkItemType"]].stateColors &&
                        extraData.workItemTypeAndStateColors[item.fields["System.WorkItemType"]].stateColors[item.fields["System.State"]] &&
                        <span 
                            className="work-item-type-state-color" 
                            style={{
                                backgroundColor: "#" +extraData.workItemTypeAndStateColors[item.fields["System.WorkItemType"]].stateColors[item.fields["System.State"]],
                                borderColor: "#" + extraData.workItemTypeAndStateColors[item.fields["System.WorkItemType"]].stateColors[item.fields["System.State"]]
                            }} />
                    }
                    <span className="state-name">{item.fields[column.fieldName]}</span>
                </Label>
            );
            break;
        case "system.assignedto":  // check isidentity flag
            innerElement = <IdentityView className="identity-cell" identityDistinctName={item.fields[column.fieldName]} />;
            break;
        default:
            innerElement = <Label className={className}>{item.fields[column.fieldName]}</Label>;
            break;          
    }

    return (
        <TooltipHost 
            content={text}
            delay={TooltipDelay.zero}
            overflowMode={TooltipOverflowMode.Parent}   // use null for identity fields
            directionalHint={DirectionalHint.bottomLeftEdge}
            >
            {innerElement}
        </TooltipHost>
    );
}

export function getColumnSize(field: WorkItemField): {minWidth: number, maxWidth: number} {
    if (Utils_String.equals(field.referenceName, "System.Id", true)) {
        return { minWidth: 40, maxWidth: 70}
    }
    else if (Utils_String.equals(field.referenceName, "System.WorkItemType", true)) {
        return { minWidth: 50, maxWidth: 100}
    }
    else if (Utils_String.equals(field.referenceName, "System.Title", true)) {
        return { minWidth: 150, maxWidth: 300}
    }
    else if (Utils_String.equals(field.referenceName, "System.State", true)) {
        return { minWidth: 50, maxWidth: 100}
    }
    else if (field.type === FieldType.TreePath) {
        return { minWidth: 150, maxWidth: 350}
    }
    else if (field.type === FieldType.Boolean) {
        return { minWidth: 40, maxWidth: 40}
    }
    else if (field.type === FieldType.DateTime) {
        return { minWidth: 80, maxWidth: 150}
    }
    else if (field.type === FieldType.Double ||
        field.type === FieldType.Integer ||
        field.type === FieldType.PicklistDouble ||
        field.type === FieldType.PicklistInteger) {
        return { minWidth: 50, maxWidth: 100}
    }
    else {
        return { minWidth: 100, maxWidth: 250}
    }
}

export async function openWorkItemDialog(e: React.MouseEvent<HTMLElement>, item: WorkItem): Promise<void> {
    let newTab = e ? e.ctrlKey : false;
    let workItemNavSvc = await WorkItemFormNavigationService.getService();
    workItemNavSvc.openWorkItem(item.id, newTab);
}