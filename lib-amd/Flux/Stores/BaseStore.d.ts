import { Store } from "VSS/Flux/Store";
export declare abstract class BaseStore<TCollection, TItem, TKey> extends Store {
    protected items: TCollection;
    private _isLoading;
    private _isItemLoadingMap;
    private _error;
    private _itemErrorMap;
    constructor();
    isLoaded(key?: TKey): boolean;
    isLoading(key?: TKey): boolean;
    setLoading(loading: boolean, key?: TKey): boolean;
    hasError(key?: TKey): boolean;
    getError(key?: TKey): string;
    setError(error: string, key?: TKey): void;
    itemExists(key: TKey): boolean;
    getAll(): TCollection;
    protected abstract initializeActionListeners(): any;
    protected abstract convertItemKeyToString(key: TKey): string;
    abstract getItem(key: TKey): TItem;
    abstract getKey(): string;
}
export declare module StoreFactory {
    function getInstance<TStore extends BaseStore<any, any, any>>(type: {
        new (): TStore;
    }): TStore;
}
