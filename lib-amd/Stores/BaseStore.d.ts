import { Store } from "VSS/Flux/Store";
export declare abstract class BaseStore<TCollection, TItem, TKey> extends Store {
    protected items: TCollection;
    private _isLoading;
    constructor();
    isLoaded(): boolean;
    isLoading(): boolean;
    itemExists(key: TKey): boolean;
    getItem(key: TKey): TItem;
    getAll(): TCollection;
    initialize(): Promise<void>;
    protected abstract getItemByKey(key: TKey): TItem;
    protected abstract initializeItems(): Promise<void>;
    abstract getKey(): string;
}
export declare module StoreFactory {
    function getInstance<TStore extends BaseStore<any, any, any>>(type: {
        new (): TStore;
    }): TStore;
}
