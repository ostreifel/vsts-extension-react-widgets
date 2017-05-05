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
define(["require", "exports", "react", "OfficeFabric/Label", "../Common/BaseComponent", "../../css/TitleView.scss"], function (require, exports, React, Label_1, BaseComponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TitleView = (function (_super) {
        __extends(TitleView, _super);
        function TitleView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TitleView.prototype.getStoresToLoad = function () {
            return [this.fluxContext.stores.workItemColorStore];
        };
        TitleView.prototype.initialize = function () {
            this.fluxContext.actionsCreator.initializeWorkItemColors();
        };
        TitleView.prototype.initializeState = function () {
            this.state = {};
        };
        TitleView.prototype.getDefaultClassName = function () {
            return "work-item-title-view";
        };
        TitleView.prototype.render = function () {
            var witColor = this.fluxContext.stores.workItemColorStore.isLoaded() ? this.fluxContext.stores.workItemColorStore.getItem({ workItemType: this.props.workItemType }) : "#FFFFFF";
            return (React.createElement(Label_1.Label, { className: this.getClassName(), style: { borderColor: witColor ? "#" + witColor : "#000" } }, this.props.title));
        };
        return TitleView;
    }(BaseComponent_1.BaseComponent));
    exports.TitleView = TitleView;
});
