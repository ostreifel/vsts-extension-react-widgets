import { Store } from "VSS/Flux/Store";

export abstract class BaseStore<TCollection, TItem, TKey> extends Store {    
    protected items: TCollection;
    private _isLoading: boolean;
    
    constructor() {
        super();

        this.items = null;
        this._isLoading = false;
    }    

    public isLoaded(): boolean {
        return this.items != null ? true : false;
    }

    public isLoading(): boolean {
        return !this.isLoaded() && this._isLoading;
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

    public async initialize(): Promise<void> {
        if (this.isLoaded()) {
            // Do nothing if data is already loaded
            this.emitChanged();
        }
        else if (!this.isLoading()) {
            this._isLoading = true;
            await this.initializeItems();
            this._isLoading = false;

            this.emitChanged();
        }
    }

    protected abstract getItemByKey(key: TKey): TItem;
    protected abstract async initializeItems(): Promise<void>;
    public abstract getKey(): string;
}

export module StoreFactory {
    let storeInstances: IDictionaryStringTo<BaseStore<any, any, any>> = {};

    export function getInstance<TStore extends BaseStore<any, any, any>>(type:{new(): TStore;}): TStore {
        const instance = new type();
        if (!storeInstances[instance.getKey()]) {
            storeInstances[instance.getKey()] = instance;
        }
        return storeInstances[instance.getKey()] as TStore;
    }
}