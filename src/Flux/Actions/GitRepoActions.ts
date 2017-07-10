import * as GitClient from "TFS/VersionControl/GitRestClient";
import { GitRepository } from "TFS/VersionControl/Contracts";

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
                gitRepoStore.setLoading(false);
                gitRepoStore.setError(null);

                GitRepoActionsCreator.InitializeGitRepos.invoke(gitRepos);
            }
            catch (e) {
                gitRepoStore.setLoading(false);
                gitRepoStore.setError(e.message || e);
            }
        }
    }
}