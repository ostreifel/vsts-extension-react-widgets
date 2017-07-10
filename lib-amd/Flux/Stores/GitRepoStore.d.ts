import { GitRepository } from "TFS/VersionControl/Contracts";
import { BaseStore } from "./BaseStore";
export declare class GitRepoStore extends BaseStore<GitRepository[], GitRepository, string> {
    getItem(idOrName: string): GitRepository;
    protected initializeActionListeners(): void;
    getKey(): string;
    protected convertItemKeyToString(key: string): string;
}
