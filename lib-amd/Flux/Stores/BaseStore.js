var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "VSS/Flux/Store"], function (require, exports, Store_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseStore = (function (_super) {
        __extends(BaseStore, _super);
        function BaseStore() {
            var _this = _super.call(this) || this;
            _this.items = null;
            _this._isLoading = false;
            _this._isItemLoadingMap = {};
            _this._error = null;
            _this._itemErrorMap = {};
            _this.initializeActionListeners();
            return _this;
        }
        BaseStore.prototype.isLoaded = function (key) {
            if (key) {
                return this.itemExists(key);
            }
            else {
                return this.items != null ? true : false;
            }
        };
        BaseStore.prototype.isLoading = function (key) {
            if (key) {
                return this._isLoading || this._isItemLoadingMap[this.convertItemKeyToString(key)] === true;
            }
            else {
                return this._isLoading;
            }
        };
        BaseStore.prototype.setLoading = function (loading, key) {
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
        };
        BaseStore.prototype.hasError = function (key) {
            return this.getError(key) != null;
        };
        BaseStore.prototype.getError = function (key) {
            if (key) {
                return this._itemErrorMap[this.convertItemKeyToString(key)] || null;
            }
            else {
                return this._error || null;
            }
        };
        BaseStore.prototype.setError = function (error, key) {
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
        };
        BaseStore.prototype.itemExists = function (key) {
            return this.getItem(key) != null ? true : false;
        };
        BaseStore.prototype.getAll = function () {
            return this.items;
        };
        return BaseStore;
    }(Store_1.Store));
    exports.BaseStore = BaseStore;
    var StoreFactory;
    (function (StoreFactory) {
        var storeInstances = {};
        function getInstance(type) {
            var instance = new type();
            if (!storeInstances[instance.getKey()]) {
                storeInstances[instance.getKey()] = instance;
            }
            return storeInstances[instance.getKey()];
        }
        StoreFactory.getInstance = getInstance;
    })(StoreFactory = exports.StoreFactory || (exports.StoreFactory = {}));
});
