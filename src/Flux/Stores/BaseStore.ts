import { Store } from "VSS/Flux/Store";
import { ActionsHub } from "../Actions/ActionsCreator";

export abstract class BaseStore<TCollection, TItem, TKey> extends Store {
    protected items: TCollection;
    protected isStoreLoading: boolean;

    constructor(actions: ActionsHub) {
        super();

        this.items = null;
        this.isStoreLoading = false;
        
        this.registerListeners(actions);
    }    

    public isLoaded(): boolean {
        return this.items ? true : false;
    }

    public setLoading(loading: boolean) {
        this.isStoreLoading = loading;
    }

    public isLoading(): boolean {
        return !this.isLoaded() && this.isStoreLoading;
    }

    public itemExists(key: TKey): boolean {
        if (!this.isLoaded()) {
            return false;
        }

        return this.getItem(key) != null ? true : false;
    }

    public getItem(key: TKey): TItem {
        if (!this.isLoaded()) {
            return null;
        }

        return this.getItemByKey(key);
    }

    public getAll(): TCollection {
        return this.items;
    }    

    protected getItemByKey(key: TKey): TItem {
        throw "Not Implemented";
    }

    protected registerListeners(actions: ActionsHub): void {
        
    }
}