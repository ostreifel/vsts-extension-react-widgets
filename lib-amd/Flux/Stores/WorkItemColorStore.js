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
    var WorkItemColorStore = (function (_super) {
        __extends(WorkItemColorStore, _super);
        function WorkItemColorStore(actions) {
            var _this = _super.call(this) || this;
            _this._items = null;
            actions.InitializeWorkItemColors.addListener(function (items) {
                if (items) {
                    _this._items = items;
                }
                _this.emitChanged();
            });
            return _this;
        }
        WorkItemColorStore.prototype.isLoaded = function () {
            return this._items ? true : false;
        };
        WorkItemColorStore.prototype.itemExists = function (witName, stateName) {
            if (!this.isLoaded()) {
                return false;
            }
            var workItemType = this._items[witName];
            return workItemType != null && (!stateName || workItemType.stateColors[stateName] != null);
        };
        WorkItemColorStore.prototype.getWorkItemTypeColor = function (witName) {
            if (!this.isLoaded() || !this.itemExists(witName)) {
                return null;
            }
            return this._items[witName].color;
        };
        WorkItemColorStore.prototype.getStateColor = function (witName, state) {
            if (!this.isLoaded() || !this.itemExists(witName, state)) {
                return null;
            }
            return this._items[witName].stateColors[state];
        };
        WorkItemColorStore.prototype.getAll = function () {
            return this._items || {};
        };
        return WorkItemColorStore;
    }(Store_1.Store));
    exports.WorkItemColorStore = WorkItemColorStore;
});
