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
        function BaseStore(actions) {
            var _this = _super.call(this) || this;
            _this._items = null;
            _this.registerListeners(actions);
            return _this;
        }
        BaseStore.prototype.isLoaded = function () {
            return this._items ? true : false;
        };
        BaseStore.prototype.itemExists = function (key) {
            if (!this.isLoaded()) {
                return false;
            }
            return this.getItem(key) != null ? true : false;
        };
        BaseStore.prototype.getItem = function (key) {
            if (!this.isLoaded()) {
                return null;
            }
            this.getItemByKey(key);
        };
        BaseStore.prototype.getAll = function () {
            return this._items;
        };
        BaseStore.prototype.getItemByKey = function (key) {
            throw "Not Implemented";
        };
        BaseStore.prototype.registerListeners = function (actions) {
        };
        return BaseStore;
    }(Store_1.Store));
    exports.BaseStore = BaseStore;
});
