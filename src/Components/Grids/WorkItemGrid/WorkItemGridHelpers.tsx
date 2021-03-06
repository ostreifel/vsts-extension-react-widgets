import * as React from "react";

import { WorkItem, WorkItemField, FieldType } from "TFS/WorkItemTracking/Contracts";
import { WorkItemFormNavigationService } from "TFS/WorkItemTracking/Services";
import Utils_String = require("VSS/Utils/String");
import Utils_Date = require("VSS/Utils/Date");

import { TooltipHost, TooltipDelay, DirectionalHint, TooltipOverflowMode } from "OfficeFabric/Tooltip";
import { Label } from "OfficeFabric/Label";

import { SortOrder } from "../Grid.Props";
import { IdentityView } from "../../WorkItemControls/IdentityView";
import { TagsView } from "../../WorkItemControls/TagsView";
import { TitleView } from "../../WorkItemControls/TitleView";
import { StateView } from "../../WorkItemControls/StateView";

export interface ICellRenderOptions {
    onClick: (ev: React.MouseEvent<HTMLElement>) => void;
}

export function workItemFieldValueComparer(w1: WorkItem, w2: WorkItem, field: WorkItemField, sortOrder: SortOrder): number {
    const v1 = w1.fields[field.referenceName];
    const v2 = w2.fields[field.referenceName];
    let compareValue: number;

    if (Utils_String.equals(field.referenceName, "System.Id", true)) {
        compareValue = (w1.id > w2.id) ? 1 : -1;
    }
    else if (field.type === FieldType.DateTime) {
        const date1 = new Date(v1 || null);
        const date2 = new Date(v2 || null);
        compareValue = Utils_Date.defaultComparer(date1, date2);
    }
    else if (field.type === FieldType.Boolean) {
        const b1 = v1 == null ? "" : (!v1 ? "False" : "True");
        const b2 = v2 == null ? "" : (!v2 ? "False" : "True");
        compareValue = Utils_String.ignoreCaseComparer(b1, b2);
    }
    else if (field.type === FieldType.Integer || field.type === FieldType.Double) {
        if (v1 == null && v2 == null) {
            compareValue = 0;
        }
        else if (v1 == null && v2 != null) {
            compareValue = -1;
        }
        else if (v1 != null && v2 == null) {
            compareValue = 1;
        }
        else {
            compareValue = (v1 > v2) ? 1 : -1;
        }
    }
    else {
        compareValue = Utils_String.ignoreCaseComparer(v1, v2);
    }

    return sortOrder === SortOrder.DESC ? -1 * compareValue : compareValue;
}

export function workItemFieldCellRenderer(item: WorkItem, field: WorkItemField, options?: ICellRenderOptions): JSX.Element {
    let text: string = item.fields[field.referenceName] != null ? item.fields[field.referenceName] : "";
    let className = "work-item-grid-cell";
    let innerElement: JSX.Element;
    let alwaysShowTooltip = false;

    if (field.type === FieldType.DateTime) {
        const dateStr = item.fields[field.referenceName];
        if (!dateStr) {
            text = "";
        }
        else {
            const date = new Date(dateStr);
            text = Utils_Date.format(date, "M/d/yyyy h:mm tt");
        }
        innerElement = <Label className={className}>{text}</Label>;
    }
    else if (field.type === FieldType.Boolean) {
        const boolValue = item.fields[field.referenceName];
        text = boolValue == null ? "" : (!boolValue ? "False" : "True");
        innerElement = <Label className={className}>{text}</Label>;
    }
    else if (field.isIdentity) {
        text = item.fields[field.referenceName] || "";
        innerElement = <IdentityView identityDistinctName={text} />;
        alwaysShowTooltip = true;
    }
    else {
        switch (field.referenceName.toLowerCase()) {
            case "system.id":  
                text = item.id.toString();
                innerElement = <Label className={className}>{text}</Label>;            
                break;
            case "system.title":
                innerElement = <TitleView className={className} onClick={options && options.onClick} title={item.fields["System.Title"]} workItemType={item.fields["System.WorkItemType"]} />
                break;
            case "system.state":
                innerElement = <StateView className={className} state={item.fields["System.State"]} workItemType={item.fields["System.WorkItemType"]} />
                break;
            case "system.tags":
                const tagsArr = (item.fields[field.referenceName] as string || "").split(";");
                innerElement = <TagsView tags={tagsArr} />;
                break;
            default:
                innerElement = <Label className={className}>{item.fields[field.referenceName]}</Label>;
                break;
        }
    }

    return (
        <TooltipHost 
            content={text}
            delay={TooltipDelay.medium}
            overflowMode={alwaysShowTooltip ? undefined : TooltipOverflowMode.Parent}   // use null for identity fields
            directionalHint={DirectionalHint.bottomLeftEdge}>
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
    else if (Utils_String.equals(field.referenceName, "System.Tags", true)) {
        return { minWidth: 100, maxWidth: 250}
    }
    else if (field.type === FieldType.TreePath) {
        return { minWidth: 150, maxWidth: 350}
    }
    else if (field.type === FieldType.Boolean) {
        return { minWidth: 40, maxWidth: 70}
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

export async function openWorkItemDialog(e: React.MouseEvent<HTMLElement>, item: WorkItem): Promise<WorkItem> {
    let newTab = e ? e.ctrlKey : false;
    let workItemNavSvc = await WorkItemFormNavigationService.getService();
    return await workItemNavSvc.openWorkItem(item.id, newTab);
}