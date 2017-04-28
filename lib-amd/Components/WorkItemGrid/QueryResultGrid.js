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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
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
define(["require", "exports", "react", "TFS/WorkItemTracking/RestClient", "VSS/Utils/String", "OfficeFabric/Utilities", "../Common/Loading", "./WorkItemGrid", "../../Flux/FluxContext"], function (require, exports, React, WitClient, Utils_String, Utilities_1, Loading_1, WorkItemGrid_1, FluxContext_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var QueryResultGrid = (function (_super) {
        __extends(QueryResultGrid, _super);
        function QueryResultGrid(props, context) {
            var _this = _super.call(this, props, context) || this;
            _this._context = FluxContext_1.FluxContext.get();
            _this._initializeState();
            return _this;
        }
        QueryResultGrid.prototype._initializeState = function () {
            this.state = {};
        };
        QueryResultGrid.prototype.componentDidMount = function () {
            this._context.stores.workItemFieldStore.addChangedListener(this._onStoreChanged);
            this._context.actionsCreator.initializeWorkItemFields();
            this._runQuery(__assign({}, this.props));
        };
        QueryResultGrid.prototype.componentWillUnmount = function () {
            this._context.stores.workItemFieldStore.removeChangedListener(this._onStoreChanged);
        };
        QueryResultGrid.prototype.componentWillReceiveProps = function (nextProps, nextContext) {
            if (!Utils_String.equals(this.props.wiql, nextProps.wiql, true)) {
                this._runQuery(__assign({}, nextProps));
            }
        };
        QueryResultGrid.prototype.render = function () {
            var _this = this;
            if (!this._isDataLoaded()) {
                return React.createElement(Loading_1.Loading, null);
            }
            else {
                return (React.createElement(WorkItemGrid_1.WorkItemGrid, { items: this.state.items, refreshWorkItems: function () { return _this._runQuery(__assign({}, _this.props), false); }, fieldColumns: this.state.fieldColumns.map(function (fr) { return _this.state.fieldsMap[fr.referenceName.toLowerCase()]; }).filter(function (f) { return f != null; }), columnsProps: this.props.columnsProps, commandBarProps: this.props.commandBarProps, contextMenuProps: this.props.contextMenuProps, onItemInvoked: this.props.onItemInvoked, selectionMode: this.props.selectionMode }));
            }
        };
        QueryResultGrid.prototype._runQuery = function (props, updateState) {
            if (updateState === void 0) { updateState = true; }
            return __awaiter(this, void 0, void 0, function () {
                var queryResult, workItemIds, workItems;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (updateState) {
                                this._updateState({ areResultsLoaded: false, items: null, fieldColumns: null });
                            }
                            return [4 /*yield*/, WitClient.getClient().queryByWiql({ query: props.wiql }, props.project, null, false, this.props.top)];
                        case 1:
                            queryResult = _a.sent();
                            workItemIds = queryResult.workItems.map(function (workItem) { return workItem.id; });
                            workItems = [];
                            if (!(workItemIds.length > 0)) return [3 /*break*/, 3];
                            return [4 /*yield*/, WitClient.getClient().getWorkItems(workItemIds)];
                        case 2:
                            workItems = _a.sent();
                            _a.label = 3;
                        case 3:
                            if (updateState) {
                                this._updateState({ areResultsLoaded: true, items: workItems, fieldColumns: queryResult.columns });
                            }
                            return [2 /*return*/, workItems];
                    }
                });
            });
        };
        QueryResultGrid.prototype._onStoreChanged = function () {
            if (!this.state.fieldsMap && this._context.stores.workItemFieldStore.isLoaded()) {
                var fields = this._context.stores.workItemFieldStore.getAll();
                var fieldsMap_1 = {};
                fields.forEach(function (f) { return fieldsMap_1[f.referenceName.toLowerCase()] = f; });
                this._updateState({ fieldsMap: fieldsMap_1 });
            }
        };
        QueryResultGrid.prototype._isDataLoaded = function () {
            return this.state.areResultsLoaded && this.state.fieldsMap != null;
        };
        QueryResultGrid.prototype._updateState = function (updatedStates) {
            this.setState(__assign({}, this.state, updatedStates));
        };
        return QueryResultGrid;
    }(React.Component));
    __decorate([
        Utilities_1.autobind
    ], QueryResultGrid.prototype, "_onStoreChanged", null);
    exports.QueryResultGrid = QueryResultGrid;
});
