import { TeamFieldValues } from "TFS/Work/Contracts";

import { BaseStore } from "./BaseStore";
import { TeamFieldActionsCreator } from "../Actions/ActionsCreator";

export class TeamFieldStore extends BaseStore<IDictionaryStringTo<TeamFieldValues>, TeamFieldValues, string> {
    constructor() {
        super();
        this.items = {};    
    }

    public getItem(teamId: string): TeamFieldValues {
         return this.items[teamId.toLowerCase()] || null;
    }

    protected initializeActionListeners() {
        TeamFieldActionsCreator.InitializeTeamFieldItem.addListener((values: {teamId: string, teamFieldValues: TeamFieldValues}) => {
            if (values) {               
                this.items[values.teamId.toLowerCase()] = values.teamFieldValues;
            }

            this.emitChanged();
        });
    }

    public getKey(): string {
        return "TeamFieldStore";
    }  
    
    protected convertItemKeyToString(key: string): string {
        return key;
    }      
}