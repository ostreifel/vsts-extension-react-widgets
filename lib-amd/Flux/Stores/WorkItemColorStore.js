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
define(["require", "exports", "./BaseStore"], function (require, exports, BaseStore_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WorkItemColorStore = (function (_super) {
        __extends(WorkItemColorStore, _super);
        function WorkItemColorStore() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WorkItemColorStore.prototype.registerListeners = function (actions) {
            var _this = this;
            actions.InitializeWorkItemColors.addListener(function (items) {
                if (items) {
                    _this._items = items;
                }
                _this.emitChanged();
            });
        };
        WorkItemColorStore.prototype.getItemByKey = function (key) {
            var workItemType = this._items[key.workItemType];
            if (workItemType) {
                if (key.stateName) {
                    return workItemType.stateColors[key.stateName];
                }
                else {
                    return workItemType.color;
                }
            }
            else {
                return null;
            }
        };
        return WorkItemColorStore;
    }(BaseStore_1.BaseStore));
    exports.WorkItemColorStore = WorkItemColorStore;
});
