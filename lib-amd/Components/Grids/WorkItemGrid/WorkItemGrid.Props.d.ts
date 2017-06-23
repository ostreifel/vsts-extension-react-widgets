import { WorkItem, WorkItemField, WorkItemFieldReference } from "TFS/WorkItemTracking/Contracts";
import { SelectionMode } from "OfficeFabric/utilities/selection/interfaces";
import { ICommandBarProps, IContextMenuProps, GridColumn } from "../Grid.Props";
import { IBaseComponentProps, IBaseComponentState } from "../../Common/BaseComponent";
export interface BaseWorkItemGridProps extends IBaseComponentProps {
    extraColumns?: IExtraWorkItemGridColumn[];
    selectionMode?: SelectionMode;
    commandBarProps?: ICommandBarProps;
    contextMenuProps?: IContextMenuProps;
    noResultsText?: string;
    setKey?: string;
    selectionPreservedOnEmptyClick?: boolean;
}
export interface IWorkItemGridProps extends BaseWorkItemGridProps {
    workItems: WorkItem[];
    fields: WorkItemField[];
    onWorkItemUpdated?: (updatedWorkItem: WorkItem) => void;
}
export interface IQueryResultGridProps extends BaseWorkItemGridProps {
    wiql: string;
    top?: number;
    project?: string;
}
export interface IQueryResultGridState extends IBaseComponentState {
    fieldColumns?: WorkItemFieldReference[];
    workItems?: WorkItem[];
    fieldsMap?: IDictionaryStringTo<WorkItemField>;
}
export interface IExtraWorkItemGridColumn {
    column: GridColumn;
    position?: ColumnPosition;
}
export declare enum ColumnPosition {
    FarLeft = 0,
    FarRight = 1,
}
