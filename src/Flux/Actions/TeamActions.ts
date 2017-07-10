import * as CoreClient from "TFS/Core/RestClient";

import { StoreFactory } from "../Stores/BaseStore";
import { TeamStore } from "../Stores/TeamStore";
import { TeamActionsCreator } from "./ActionsCreator";

export module TeamActions {
    var teamStore: TeamStore = StoreFactory.getInstance<TeamStore>(TeamStore);

    export async function initializeTeams() {
        if (teamStore.isLoaded()) {
            TeamActionsCreator.InitializeTeams.invoke(null);
        }
        else if (!teamStore.isLoading()) {
            teamStore.setLoading(true);
            try {
                const teams =  await CoreClient.getClient().getTeams(VSS.getWebContext().project.id, 300);
                teamStore.setLoading(false);
                teamStore.setError(null);

                TeamActionsCreator.InitializeTeams.invoke(teams);
            }
            catch (e) {
                teamStore.setLoading(false);
                teamStore.setError(e.message || e);
            }
        }
    }
}