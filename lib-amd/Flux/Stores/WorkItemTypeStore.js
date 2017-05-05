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
define(["require", "exports", "VSS/Utils/String", "VSS/Utils/Array", "./BaseStore"], function (require, exports, Utils_String, Utils_Array, BaseStore_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WorkItemTypeStore = (function (_super) {
        __extends(WorkItemTypeStore, _super);
        function WorkItemTypeStore() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WorkItemTypeStore.prototype.registerListeners = function (actions) {
            var _this = this;
            actions.InitializeWorkItemTypes.addListener(function (items) {
                if (!items) {
                    _this.emitChanged();
                }
                _this._onAdd(items);
            });
        };
        WorkItemTypeStore.prototype.getItemByKey = function (typeName) {
            return Utils_Array.first(this.items, function (item) { return Utils_String.equals(item.name, typeName, true); });
        };
        WorkItemTypeStore.prototype._onAdd = function (items) {
            if (!items) {
                return;
            }
            if (!this.items) {
                this.items = [];
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
        WorkItemTypeStore.prototype._addItem = function (item) {
            var existingItemIndex = Utils_Array.findIndex(this.items, function (existingItem) { return Utils_String.equals(item.name, existingItem.name, true); });
            if (existingItemIndex != -1) {
                this.items[existingItemIndex] = item;
            }
            else {
                this.items.push(item);
            }
        };
        return WorkItemTypeStore;
    }(BaseStore_1.BaseStore));
    exports.WorkItemTypeStore = WorkItemTypeStore;
});
