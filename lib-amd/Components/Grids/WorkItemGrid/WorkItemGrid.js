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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "VSS/Utils/String", "../BaseGrid", "../BaseGrid.Props", "./WorkItemGridHelpers", "../../../css/WorkItemsGrid.scss"], function (require, exports, Utils_String, BaseGrid_1, BaseGrid_Props_1, WorkItemHelpers) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WorkItemGrid = (function (_super) {
        __extends(WorkItemGrid, _super);
        function WorkItemGrid() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WorkItemGrid.prototype.getStoresToLoad = function () {
            return [this.fluxContext.stores.workItemColorStore];
        };
        WorkItemGrid.prototype.initialize = function () {
            this.fluxContext.actionsCreator.initializeWorkItemColors();
        };
        WorkItemGrid.prototype.getComponentKey = function () {
            return "work-item-grid";
        };
        WorkItemGrid.prototype.getCommandMenuItems = function () {
            var _this = this;
            var menuItems = _super.prototype.getCommandMenuItems.call(this);
            menuItems.push({
                key: "OpenQuery", name: "Open as query", title: "Open all workitems as a query", iconProps: { iconName: "OpenInNewWindow" },
                disabled: !this.state.filteredItems || this.state.filteredItems.length === 0,
                onClick: function (event, menuItem) { return __awaiter(_this, void 0, void 0, function () {
                    var url;
                    return __generator(this, function (_a) {
                        url = VSS.getWebContext().host.uri + "/" + VSS.getWebContext().project.id + "/_workitems?_a=query&wiql=" + encodeURIComponent(this._getWiql());
                        window.open(url, "_blank");
                        return [2];
                    });
                }); }
            });
            return menuItems;
        };
        WorkItemGrid.prototype.getContextMenuItems = function () {
            var _this = this;
            var menuItems = _super.prototype.getContextMenuItems.call(this);
            var selectedWorkItems = this.selection.getSelection();
            menuItems.push({
                key: "OpenQuery", name: "Open as query", title: "Open selected workitems as a query", iconProps: { iconName: "OpenInNewWindow" },
                disabled: this.selection.getSelectedCount() == 0,
                onClick: function (event, menuItem) {
                    var url = VSS.getWebContext().host.uri + "/" + VSS.getWebContext().project.id + "/_workitems?_a=query&wiql=" + encodeURIComponent(_this._getWiql(selectedWorkItems));
                    window.open(url, "_blank");
                }
            });
            return menuItems;
        };
        WorkItemGrid.prototype.itemComparer = function (workItem1, workItem2, sortColumnKey, sortOrder) {
            return WorkItemHelpers.workItemFieldValueComparer(workItem1, workItem2, sortColumnKey, sortOrder);
        };
        WorkItemGrid.prototype.itemFilter = function (workItem, filterText) {
            for (var _i = 0, _a = this.props.columns; _i < _a.length; _i++) {
                var field = _a[_i];
                if (Utils_String.caseInsensitiveContains(workItem.fields[field.referenceName] || "", filterText)) {
                    return true;
                }
            }
            return false;
        };
        WorkItemGrid.prototype.onItemInvoked = function (workItem, index, ev) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    WorkItemHelpers.openWorkItemDialog(null, workItem);
                    return [2];
                });
            });
        };
        WorkItemGrid.prototype.columnMapper = function (field) {
            var columnSize = WorkItemHelpers.getColumnSize(field);
            return {
                fieldName: field.referenceName,
                key: field.referenceName,
                name: field.name,
                minWidth: columnSize.minWidth,
                maxWidth: columnSize.maxWidth,
                isResizable: !this.props.columnsProps.disableColumnResize,
                isSorted: this.state.sortColumnKey && Utils_String.equals(this.state.sortColumnKey, field.referenceName, true),
                isSortedDescending: this.state.sortOrder && this.state.sortOrder === BaseGrid_Props_1.SortOrder.DESC
            };
        };
        WorkItemGrid.prototype.onRenderCell = function (workItem, index, column) {
            return WorkItemHelpers.workItemFieldCellRenderer(workItem, index, column, { workItemTypeAndStateColors: this.fluxContext.stores.workItemColorStore.getAll() });
        };
        WorkItemGrid.prototype._getWiql = function (workItems) {
            var fieldStr = this.props.columns.map(function (f) { return "[" + f.referenceName + "]"; }).join(",");
            var ids = (workItems || this.state.filteredItems).map(function (w) { return w.id; }).join(",");
            var sortColumn = this.state.sortColumnKey ? this.state.sortColumnKey : "System.CreatedDate";
            var sortOrder = this.state.sortOrder === BaseGrid_Props_1.SortOrder.DESC ? "DESC" : "";
            return "SELECT " + fieldStr + "\n                 FROM WorkItems \n                 WHERE [System.TeamProject] = @project \n                 AND [System.ID] IN (" + ids + ") \n                 ORDER BY [" + sortColumn + "] " + sortOrder;
        };
        return WorkItemGrid;
    }(BaseGrid_1.BaseGrid));
    exports.WorkItemGrid = WorkItemGrid;
});
