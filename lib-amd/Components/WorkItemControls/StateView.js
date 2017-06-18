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
define(["require", "exports", "react", "OfficeFabric/Label", "../Common/BaseComponent", "../../Stores/BaseStore", "../../Stores/WorkItemColorStore", "../../css/StateView.scss"], function (require, exports, React, Label_1, BaseComponent_1, BaseStore_1, WorkItemColorStore_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StateView = (function (_super) {
        __extends(StateView, _super);
        function StateView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        StateView.prototype.getStoresToLoad = function () {
            return [WorkItemColorStore_1.WorkItemColorStore];
        };
        StateView.prototype.initialize = function () {
            BaseStore_1.StoreFactory.getInstance(WorkItemColorStore_1.WorkItemColorStore).initialize();
        };
        StateView.prototype.initializeState = function () {
            this.state = {};
        };
        StateView.prototype.getDefaultClassName = function () {
            return "work-item-state-view";
        };
        StateView.prototype.render = function () {
            var storeInstance = BaseStore_1.StoreFactory.getInstance(WorkItemColorStore_1.WorkItemColorStore);
            var stateColor = storeInstance.isLoaded() ? storeInstance.getItem({ workItemType: this.props.workItemType, stateName: this.props.state }) : null;
            if (stateColor) {
                stateColor = "#" + stateColor.substring(stateColor.length - 6);
            }
            else {
                stateColor = "#000000";
            }
            return (React.createElement(Label_1.Label, { className: this.getClassName() },
                React.createElement("span", { className: "work-item-type-state-color", style: {
                        backgroundColor: stateColor,
                        borderColor: stateColor
                    } }),
                React.createElement("span", { className: "state-name" }, this.props.state)));
        };
        return StateView;
    }(BaseComponent_1.BaseComponent));
    exports.StateView = StateView;
});
