import { Store } from "VSS/Flux/Store";
import { ActionsHub } from "../Actions/ActionsCreator";

export abstract class BaseStore<TCollection, TItem, TKey> extends Store {
    protected _items: TCollection;

    constructor(actions: ActionsHub) {
        super();

        this._items = null;
        this.registerListeners(actions);
    }    

    public isLoaded(): boolean {
        return this._items ? true : false;
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

        this.getItemByKey(key);
    }

    public getAll(): TCollection {
        return this._items;
    }    

    protected getItemByKey(key: TKey): TItem {
        throw "Not Implemented";
    }

    protected registerListeners(actions: ActionsHub): void {

    }
}