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
define(["require", "exports", "react", "OfficeFabric/Label", "../Common/BaseComponent", "../../Stores/BaseStore", "../../Stores/WorkItemColorStore", "../../css/TitleView.scss"], function (require, exports, React, Label_1, BaseComponent_1, BaseStore_1, WorkItemColorStore_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TitleView = (function (_super) {
        __extends(TitleView, _super);
        function TitleView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TitleView.prototype.getStoresToLoad = function () {
            return [WorkItemColorStore_1.WorkItemColorStore];
        };
        TitleView.prototype.initialize = function () {
            BaseStore_1.StoreFactory.getInstance(WorkItemColorStore_1.WorkItemColorStore).initialize();
        };
        TitleView.prototype.initializeState = function () {
            this.state = {};
        };
        TitleView.prototype.getDefaultClassName = function () {
            return "work-item-title-view";
        };
        TitleView.prototype.render = function () {
            var storeInstance = BaseStore_1.StoreFactory.getInstance(WorkItemColorStore_1.WorkItemColorStore);
            var witColor = storeInstance.isLoaded() ? storeInstance.getItem({ workItemType: this.props.workItemType }) : "#FFFFFF";
            return (React.createElement(Label_1.Label, { className: this.getClassName(), style: { borderColor: witColor ? "#" + witColor : "#000" } }, this.props.title));
        };
        return TitleView;
    }(BaseComponent_1.BaseComponent));
    exports.TitleView = TitleView;
});
