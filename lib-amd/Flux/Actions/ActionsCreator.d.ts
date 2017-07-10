import { Action } from "VSS/Flux/Action";
import { WorkItemType, WorkItemField, WorkItemTemplate, WorkItemTemplateReference, WorkItemStateColor } from "TFS/WorkItemTracking/Contracts";
import { WebApiTeam } from "TFS/Core/Contracts";
import { GitRepository } from "TFS/VersionControl/Contracts";
import { TeamFieldValues } from "TFS/Work/Contracts";
export declare module WorkItemTypeActionsCreator {
    var InitializeWorkItemTypes: Action<WorkItemType[]>;
}
export declare module WorkItemFieldActionsCreator {
    var InitializeWorkItemFields: Action<WorkItemField[]>;
}
export declare module WorkItemTemplateActionsCreator {
    var InitializeWorkItemTemplates: Action<WorkItemTemplateReference[]>;
}
export declare module WorkItemTemplateItemActionsCreator {
    var InitializeWorkItemTemplateItem: Action<WorkItemTemplate>;
}
export declare module WorkItemStateItemActionsCreator {
    var InitializeWorkItemStateItems: Action<{
        witName: string;
        states: WorkItemStateColor[];
    }>;
}
export declare module TeamActionsCreator {
    var InitializeTeams: Action<WebApiTeam[]>;
}
export declare module GitRepoActionsCreator {
    var InitializeGitRepos: Action<GitRepository[]>;
}
export declare module TeamFieldActionsCreator {
    var InitializeTeamFieldItem: Action<{
        teamId: string;
        teamFieldValues: TeamFieldValues;
    }>;
}
