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
define(["require", "exports", "react", "./ComboBox", "../../../Stores/AreaPathStore", "../BaseComponent", "../../../Stores/BaseStore", "VSS/Controls/TreeView"], function (require, exports, React, ComboBox_1, AreaPathStore_1, BaseComponent_1, BaseStore_1, TreeView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AreaPathCombo = (function (_super) {
        __extends(AreaPathCombo, _super);
        function AreaPathCombo() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AreaPathCombo.prototype.getDefaultClassName = function () {
            return "areapathcombo";
        };
        AreaPathCombo.prototype.getStoresToLoad = function () {
            return [AreaPathStore_1.AreaPathStore];
        };
        AreaPathCombo.prototype.initialize = function () {
            BaseStore_1.StoreFactory.getInstance(AreaPathStore_1.AreaPathStore).initialize();
        };
        AreaPathCombo.prototype.onStoreChanged = function () {
            var rootNode = BaseStore_1.StoreFactory.getInstance(AreaPathStore_1.AreaPathStore).getItem(VSS.getWebContext().project.id);
            if (rootNode) {
                this.updateState({
                    treeNodes: this._getTreeNode(rootNode, null, 1)
                });
            }
        };
        AreaPathCombo.prototype.initializeState = function () {
            this.state = {};
        };
        AreaPathCombo.prototype.render = function () {
            if (this.state.treeNodes) {
                return React.createElement(ComboBox_1.ComboBox, { value: this.props.value, onChange: this.props.onChange, options: {
                        type: "treeSearch",
                        mode: "drop",
                        initialLevel: 2,
                        sepChar: "\\",
                        source: [this.state.treeNodes],
                        enabled: true,
                        allowEdit: true
                    } });
            }
            return null;
        };
        AreaPathCombo.prototype._getTreeNode = function (node, uiNode, level) {
            var nodes = node.children;
            var newUINode;
            var nodeName = node.name;
            level = level || 1;
            if (uiNode) {
                newUINode = TreeView_1.TreeNode.create(nodeName);
                uiNode.add(newUINode);
                uiNode = newUINode;
            }
            else {
                uiNode = TreeView_1.TreeNode.create(nodeName);
            }
            uiNode.expanded = level < 2;
            if (nodes) {
                for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
                    var node_1 = nodes_1[_i];
                    this._getTreeNode(node_1, uiNode, level + 1);
                }
            }
            return uiNode;
        };
        return AreaPathCombo;
    }(BaseComponent_1.BaseComponent));
    exports.AreaPathCombo = AreaPathCombo;
});
