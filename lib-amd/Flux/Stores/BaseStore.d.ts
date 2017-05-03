import { Store } from "VSS/Flux/Store";
import { ActionsHub } from "../Actions/ActionsCreator";
export declare abstract class BaseStore<TCollection, TItem, TKey> extends Store {
    protected _items: TCollection;
    constructor(actions: ActionsHub);
    isLoaded(): boolean;
    itemExists(key: TKey): boolean;
    getItem(key: TKey): TItem;
    getAll(): TCollection;
    protected getItemByKey(key: TKey): TItem;
    protected registerListeners(actions: ActionsHub): void;
}
