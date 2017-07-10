import { Action } from "VSS/Flux/Action";
import { WorkItemType, WorkItemField, WorkItemTemplate, WorkItemTemplateReference, WorkItemStateColor } from "TFS/WorkItemTracking/Contracts";
import { WebApiTeam, TeamContext } from "TFS/Core/Contracts";
import { GitRepository } from "TFS/VersionControl/Contracts";
import { TeamFieldValues } from "TFS/Work/Contracts";

export module WorkItemTypeActionsCreator {
    export var InitializeWorkItemTypes = new Action<WorkItemType[]>();
}

export module WorkItemFieldActionsCreator {
    export var InitializeWorkItemFields = new Action<WorkItemField[]>();
}

export module WorkItemTemplateActionsCreator {
    export var InitializeWorkItemTemplates = new Action<WorkItemTemplateReference[]>();
}

export module WorkItemTemplateItemActionsCreator {
    export var InitializeWorkItemTemplateItem = new Action<WorkItemTemplate>();
}

export module WorkItemStateItemActionsCreator {
    export var InitializeWorkItemStateItems = new Action<{witName: string, states: WorkItemStateColor[]}>();
}

export module TeamActionsCreator {
    export var InitializeTeams = new Action<WebApiTeam[]>();
}

export module GitRepoActionsCreator {
    export var InitializeGitRepos = new Action<GitRepository[]>();
}

export module TeamFieldActionsCreator {
    export var InitializeTeamFieldItem = new Action<{teamId: string, teamFieldValues: TeamFieldValues}>();
}
