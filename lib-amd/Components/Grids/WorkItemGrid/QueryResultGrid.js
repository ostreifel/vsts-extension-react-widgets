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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
define(["require", "exports", "react", "OfficeFabric/Utilities", "TFS/WorkItemTracking/RestClient", "VSS/Utils/String", "VSS/Utils/Array", "../../Common/Loading", "../../Common/BaseComponent", "./WorkItemGrid", "../../../Flux/Stores/BaseStore", "../../../Flux/Stores/WorkItemFieldStore", "../../../Flux/Actions/WorkItemFieldActions"], function (require, exports, React, Utilities_1, WitClient, Utils_String, Utils_Array, Loading_1, BaseComponent_1, WorkItemGrid_1, BaseStore_1, WorkItemFieldStore_1, WorkItemFieldActions_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var QueryResultGrid = (function (_super) {
        __extends(QueryResultGrid, _super);
        function QueryResultGrid() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._workItemFieldStore = BaseStore_1.StoreFactory.getInstance(WorkItemFieldStore_1.WorkItemFieldStore);
            return _this;
        }
        QueryResultGrid.prototype.getStores = function () {
            return [this._workItemFieldStore];
        };
        QueryResultGrid.prototype.componentDidMount = function () {
            _super.prototype.componentDidMount.call(this);
            WorkItemFieldActions_1.WorkItemFieldActions.initializeWorkItemFields();
            this._runQuery(this.props);
        };
        QueryResultGrid.prototype.getStoresState = function () {
            if (this._workItemFieldStore.isLoaded()) {
                var fields = this._workItemFieldStore.getAll();
                var fieldsMap_1 = {};
                fields.forEach(function (f) { return fieldsMap_1[f.referenceName.toLowerCase()] = f; });
                return {
                    fieldsMap: fieldsMap_1
                };
            }
            else {
                return {};
            }
        };
        QueryResultGrid.prototype.getDefaultClassName = function () {
            return "query-results-grid";
        };
        QueryResultGrid.prototype.componentWillReceiveProps = function (nextProps, nextContext) {
            if (!Utils_String.equals(this.props.wiql, nextProps.wiql, true) ||
                !Utils_String.equals(this.props.project, nextProps.project, true) ||
                this.props.top !== nextProps.top) {
                this._runQuery(nextProps);
            }
        };
        QueryResultGrid.prototype.render = function () {
            var _this = this;
            if (!this._isDataLoaded()) {
                return React.createElement(Loading_1.Loading, null);
            }
            else {
                return (React.createElement(WorkItemGrid_1.WorkItemGrid, { className: this.getClassName(), workItems: this.state.workItems, fields: this.state.fieldColumns.map(function (fr) { return _this.state.fieldsMap[fr.referenceName.toLowerCase()]; }).filter(function (f) { return f != null; }), commandBarProps: this._getCommandBarProps(), contextMenuProps: this.props.contextMenuProps, selectionMode: this.props.selectionMode, extraColumns: this.props.extraColumns, setKey: this.props.setKey, selectionPreservedOnEmptyClick: this.props.selectionPreservedOnEmptyClick || false, onWorkItemUpdated: this._onWorkItemUpdated, noResultsText: this.props.noResultsText || "Query returned no results." }));
            }
        };
        QueryResultGrid.prototype._onWorkItemUpdated = function (updatedWorkItem) {
            var newList = this.state.workItems.slice();
            var index = Utils_Array.findIndex(this.state.workItems, function (w) { return w.id === updatedWorkItem.id; });
            if (index !== -1) {
                newList[index].fields = updatedWorkItem.fields;
                newList[index].rev = updatedWorkItem.rev;
                this.updateState({ workItems: newList });
            }
        };
        QueryResultGrid.prototype._getCommandBarProps = function () {
            var _this = this;
            var menuItems = [
                {
                    key: "refresh", name: "Refresh", title: "Refresh items", iconProps: { iconName: "Refresh" },
                    onClick: function (event, menuItem) {
                        _this._runQuery(_this.props);
                    }
                }
            ];
            if (this.props.commandBarProps && this.props.commandBarProps.menuItems && this.props.commandBarProps.menuItems.length > 0) {
                menuItems = menuItems.concat(this.props.commandBarProps.menuItems);
            }
            return {
                hideSearchBox: this.props.commandBarProps && this.props.commandBarProps.hideSearchBox,
                hideCommandBar: this.props.commandBarProps && this.props.commandBarProps.hideCommandBar,
                menuItems: menuItems,
                farMenuItems: this.props.commandBarProps && this.props.commandBarProps.farMenuItems
            };
        };
        QueryResultGrid.prototype._runQuery = function (props) {
            return __awaiter(this, void 0, void 0, function () {
                var queryResult, workItemIds, workItems;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.updateState({ workItems: null, fieldColumns: null });
                            return [4, WitClient.getClient().queryByWiql({ query: props.wiql }, props.project, null, false, this.props.top)];
                        case 1:
                            queryResult = _a.sent();
                            workItemIds = queryResult.workItems.map(function (workItem) { return workItem.id; });
                            workItems = [];
                            if (!(workItemIds.length > 0)) return [3, 3];
                            return [4, WitClient.getClient().getWorkItems(workItemIds)];
                        case 2:
                            workItems = _a.sent();
                            _a.label = 3;
                        case 3:
                            this.updateState({ workItems: workItems, fieldColumns: queryResult.columns });
                            return [2];
                    }
                });
            });
        };
        QueryResultGrid.prototype._isDataLoaded = function () {
            return this.state.workItems != null && this.state.fieldColumns != null && this.state.fieldsMap != null;
        };
        return QueryResultGrid;
    }(BaseComponent_1.BaseComponent));
    __decorate([
        Utilities_1.autobind
    ], QueryResultGrid.prototype, "_onWorkItemUpdated", null);
    exports.QueryResultGrid = QueryResultGrid;
});
