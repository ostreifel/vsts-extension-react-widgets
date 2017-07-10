import { Store } from "VSS/Flux/Store";

export abstract class BaseStore<TCollection, TItem, TKey> extends Store {    
    protected items: TCollection;
    private _isLoading: boolean;
    private _isItemLoadingMap: IDictionaryStringTo<boolean>;
    private _error: string;
    private _itemErrorMap:  IDictionaryStringTo<string>;

    constructor() {
        super();

        this.items = null;
        this._isLoading = false;
        this._isItemLoadingMap = {};
        this._error = null;
        this._itemErrorMap = {};

        this.initializeActionListeners();
    }    

    public isLoaded(key?: TKey): boolean {
        if (key) {
            return this.itemExists(key);
        }
        else {
            return this.items != null ? true : false;
        }        
    }

    public isLoading(key?: TKey): boolean {
        if (key) {
            return this._isLoading || this._isItemLoadingMap[this.convertItemKeyToString(key)] === true;
        }
        else {
            return this._isLoading;
        }
    }

    public setLoading(loading: boolean, key?: TKey) {
        if (key) {
            if (loading) {
                this._isItemLoadingMap[this.convertItemKeyToString(key)] = true;
            }
            else {
                delete this._isItemLoadingMap[this.convertItemKeyToString(key)];
            }
        }
        else {
            return this._isLoading = loading;
        }
    }  

    public hasError(key?: TKey): boolean {
        return this.getError(key) != null;
    }

    public getError(key?: TKey): string {
        if (key) {
            return this._itemErrorMap[this.convertItemKeyToString(key)] || null;
        }
        else {
            return this._error || null;
        }
    }

    public setError(error: string, key?: TKey) {
        if (key) {
            if (error) {
                this._itemErrorMap[this.convertItemKeyToString(key)] = error;
            }
            else {
                delete this._itemErrorMap[this.convertItemKeyToString(key)];
            }
        }
        else {
            this._error = error || null;
        }
        
        this.emitChanged();
    }    

    public itemExists(key: TKey): boolean {        
        return this.getItem(key) != null ? true : false;
    }

    public getAll(): TCollection {
        return this.items;
    }

    protected abstract initializeActionListeners();
    protected abstract convertItemKeyToString(key: TKey): string;
    public abstract getItem(key: TKey): TItem;
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