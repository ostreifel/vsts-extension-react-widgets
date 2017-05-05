import { Store } from "VSS/Flux/Store";
import { ActionsHub } from "../Actions/ActionsCreator";
export declare abstract class BaseStore<TCollection, TItem, TKey> extends Store {
    protected items: TCollection;
    protected isStoreLoading: boolean;
    constructor(actions: ActionsHub);
    isLoaded(): boolean;
    setLoading(loading: boolean): void;
    isLoading(): boolean;
    itemExists(key: TKey): boolean;
    getItem(key: TKey): TItem;
    getAll(): TCollection;
    protected getItemByKey(key: TKey): TItem;
    protected registerListeners(actions: ActionsHub): void;
}
