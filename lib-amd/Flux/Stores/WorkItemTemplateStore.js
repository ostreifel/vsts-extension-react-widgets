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
define(["require", "exports", "VSS/Utils/String", "VSS/Utils/Array", "VSS/Flux/Store"], function (require, exports, Utils_String, Utils_Array, Store_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WorkItemTemplateStore = (function (_super) {
        __extends(WorkItemTemplateStore, _super);
        function WorkItemTemplateStore(actions) {
            var _this = _super.call(this) || this;
            _this._items = null;
            actions.InitializeWorkItemTemplates.addListener(function (items) {
                if (!items) {
                    _this.emitChanged();
                }
                _this._onAdd(items);
            });
            return _this;
        }
        WorkItemTemplateStore.prototype.isLoaded = function () {
            return this._items ? true : false;
        };
        WorkItemTemplateStore.prototype.itemExists = function (id) {
            return this._getById(id) ? true : false;
        };
        WorkItemTemplateStore.prototype.getItem = function (id) {
            return this._getById(id);
        };
        WorkItemTemplateStore.prototype.getAll = function () {
            return this._items || [];
        };
        WorkItemTemplateStore.prototype._getById = function (id) {
            if (!this.isLoaded()) {
                return null;
            }
            return Utils_Array.first(this._items, function (item) { return Utils_String.equals(item.id, id, true); });
        };
        WorkItemTemplateStore.prototype._onAdd = function (items) {
            if (!items) {
                return;
            }
            if (!this._items) {
                this._items = [];
            }
            if (Array.isArray(items)) {
                for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                    var item = items_1[_i];
                    this._addItem(item);
                }
            }
            else {
                this._addItem(items);
            }
            this.emitChanged();
        };
        WorkItemTemplateStore.prototype._addItem = function (item) {
            var existingItemIndex = Utils_Array.findIndex(this._items, function (existingItem) { return Utils_String.equals(item.id, existingItem.id, true); });
            if (existingItemIndex != -1) {
                this._items[existingItemIndex] = item;
            }
            else {
                this._items.push(item);
            }
        };
        return WorkItemTemplateStore;
    }(Store_1.Store));
    exports.WorkItemTemplateStore = WorkItemTemplateStore;
});
