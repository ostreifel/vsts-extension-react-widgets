import * as GitClient from "TFS/VersionControl/GitRestClient";

import { StoreFactory } from "../Stores/BaseStore";
import { GitRepoStore } from "../Stores/GitRepoStore";
import { GitRepoActionsCreator } from "./ActionsCreator";

export module GitRepoActions {
    var gitRepoStore: GitRepoStore = StoreFactory.getInstance<GitRepoStore>(GitRepoStore);

    export async function initializeGitRepos() {
        if (gitRepoStore.isLoaded()) {
            GitRepoActionsCreator.InitializeGitRepos.invoke(null);
        }
        else if (!gitRepoStore.isLoading()) {
            gitRepoStore.setLoading(true);
            try {
                const gitRepos =  await GitClient.getClient().getRepositories(VSS.getWebContext().project.id);
                GitRepoActionsCreator.InitializeGitRepos.invoke(gitRepos);
                gitRepoStore.setLoading(false);
            }
            catch (e) {
                gitRepoStore.setLoading(false);
                throw e;
            }
        }
    }
}