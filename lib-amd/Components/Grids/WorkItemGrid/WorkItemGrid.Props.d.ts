import { WorkItem, WorkItemField, WorkItemFieldReference } from "TFS/WorkItemTracking/Contracts";
import { SelectionMode } from "OfficeFabric/utilities/selection/interfaces";
import { IBaseGridProps, IBaseGridState, IColumnsProps, ICommandBarProps, IContextMenuProps } from "../BaseGrid.Props";
export interface IWorkItemGridProps extends IBaseGridProps<WorkItem, WorkItemField> {
}
export interface IWorkItemGridState extends IBaseGridState<WorkItem> {
    workItemTypeAndStateColors?: IDictionaryStringTo<{
        color: string;
        stateColors: IDictionaryStringTo<string>;
    }>;
}
export interface IQueryResultGridProps {
    wiql: string;
    top?: number;
    project?: string;
    columnsProps?: IColumnsProps<WorkItem>;
    commandBarProps?: ICommandBarProps;
    contextMenuProps?: IContextMenuProps<WorkItem>;
    selectionMode?: SelectionMode;
}
export interface IQueryResultGridState {
    areResultsLoaded?: boolean;
    items?: WorkItem[];
    fieldColumns?: WorkItemFieldReference[];
    fieldsMap?: IDictionaryStringTo<WorkItemField>;
}
export declare enum ColumnType {
    Field = 0,
    Custom = 1,
}
