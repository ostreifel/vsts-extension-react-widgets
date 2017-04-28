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
define(["require", "exports", "react", "OfficeFabric/DetailsList", "OfficeFabric/utilities/selection", "OfficeFabric/Utilities", "OfficeFabric/ContextualMenu", "OfficeFabric/CommandBar", "OfficeFabric/SearchBox", "VSS/Utils/String", "./WorkItemGrid.Props", "../Common/Loading", "../Common/MessagePanel", "../../Flux/FluxContext", "./WorkItemGridHelpers", "../../css/WorkItemsGrid.scss"], function (require, exports, React, DetailsList_1, selection_1, Utilities_1, ContextualMenu_1, CommandBar_1, SearchBox_1, Utils_String, WorkItemGrid_Props_1, Loading_1, MessagePanel_1, FluxContext_1, WorkItemHelpers) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WorkItemGrid = (function (_super) {
        __extends(WorkItemGrid, _super);
        function WorkItemGrid(props, context) {
            var _this = _super.call(this, props, context) || this;
            _this._selection = new selection_1.Selection();
            _this._context = FluxContext_1.FluxContext.get();
            _this._initializeState();
            return _this;
        }
        WorkItemGrid.prototype._initializeState = function () {
            this.state = {
                filteredItems: this.props.items || [],
                items: this.props.items || [],
                sortColumn: null,
                sortOrder: WorkItemGrid_Props_1.SortOrder.ASC,
                filterText: ""
            };
        };
        WorkItemGrid.prototype.componentDidMount = function () {
            this._context.stores.workItemColorStore.addChangedListener(this._onStoreChanged);
            this._context.actionsCreator.initializeWorkItemColors();
        };
        WorkItemGrid.prototype.componentWillUnmount = function () {
            this._context.stores.workItemColorStore.removeChangedListener(this._onStoreChanged);
        };
        WorkItemGrid.prototype.render = function () {
            return (React.createElement("div", { className: this._getClassName() },
                this._renderCommandBar(),
                this._renderWorkItemGrid(),
                this.state.isContextMenuVisible && !this.props.contextMenuProps.disableContextMenu && (React.createElement(ContextualMenu_1.ContextualMenu, { className: this._getClassName("context-menu"), items: this._getContextMenuItems(), target: this.state.contextMenuTarget, shouldFocusOnMount: true, onDismiss: this._hideContextMenu }))));
        };
        WorkItemGrid.prototype._renderCommandBar = function () {
            return (React.createElement("div", { className: this._getClassName("menu-bar-container") },
                !this.props.commandBarProps.hideSearchBox && (React.createElement(SearchBox_1.SearchBox, { className: this._getClassName("searchbox"), value: this.state.filterText || "", onSearch: this._updateFilterText, onChange: this._updateFilterText })),
                !this.props.commandBarProps.hideCommandBar && (React.createElement(CommandBar_1.CommandBar, { className: this._getClassName("menu-bar"), items: this._getCommandMenuItems(), farItems: this._getFarCommandMenuItems() }))));
        };
        WorkItemGrid.prototype._getCommandMenuItems = function () {
            var _this = this;
            var menuItems = [];
            if (this.props.refreshWorkItems) {
                menuItems.push({
                    key: "refresh", name: "Refresh", title: "Refresh workitems", iconProps: { iconName: "Refresh" },
                    onClick: function (event, menuItem) { return __awaiter(_this, void 0, void 0, function () {
                        var workItems;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.setState({ loading: true });
                                    return [4 /*yield*/, this.props.refreshWorkItems()];
                                case 1:
                                    workItems = _a.sent();
                                    this._updateState({ items: workItems, filteredItems: this._sortAndFilterWorkItems(workItems, this.state.sortColumn, this.state.sortOrder, this.state.filterText) });
                                    this.setState({ loading: false });
                                    return [2 /*return*/];
                            }
                        });
                    }); }
                });
            }
            menuItems.push({
                key: "OpenQuery", name: "Open as query", title: "Open all workitems as a query", iconProps: { iconName: "OpenInNewWindow" },
                disabled: !this.state.filteredItems || this.state.filteredItems.length === 0,
                onClick: function (event, menuItem) { return __awaiter(_this, void 0, void 0, function () {
                    var url;
                    return __generator(this, function (_a) {
                        url = VSS.getWebContext().host.uri + "/" + VSS.getWebContext().project.id + "/_workitems?_a=query&wiql=" + encodeURIComponent(this._getWiql());
                        window.open(url, "_blank");
                        return [2 /*return*/];
                    });
                }); }
            });
            if (this.props.commandBarProps.extraCommandMenuItems && this.props.commandBarProps.extraCommandMenuItems.length > 0) {
                menuItems.push({ key: "divider", name: "Divider", itemType: ContextualMenu_1.ContextualMenuItemType.Divider });
                menuItems = menuItems.concat(this.props.commandBarProps.extraCommandMenuItems);
            }
            return menuItems;
        };
        WorkItemGrid.prototype._getFarCommandMenuItems = function () {
            var menuItems = [
                {
                    key: "resultCount",
                    name: this.state.filteredItems.length + " results",
                    className: this._getClassName("result-count")
                }
            ];
            if (this.props.commandBarProps.farCommandMenuItems && this.props.commandBarProps.farCommandMenuItems.length > 0) {
                menuItems = menuItems.concat(this.props.commandBarProps.farCommandMenuItems);
            }
            return menuItems;
        };
        WorkItemGrid.prototype._getContextMenuItems = function () {
            var _this = this;
            var selectedWorkItems = this._selection.getSelection();
            var contextMenuItems = [
                {
                    key: "OpenQuery", name: "Open as query", title: "Open selected workitems as a query", iconProps: { iconName: "OpenInNewWindow" },
                    disabled: this._selection.getSelectedCount() == 0,
                    onClick: function (event, menuItem) {
                        var url = VSS.getWebContext().host.uri + "/" + VSS.getWebContext().project.id + "/_workitems?_a=query&wiql=" + encodeURIComponent(_this._getWiql(selectedWorkItems));
                        window.open(url, "_blank");
                    }
                }
            ];
            if (this.props.contextMenuProps.extraContextMenuItems) {
                var extraContextMenus = this.props.contextMenuProps.extraContextMenuItems(selectedWorkItems);
                if (extraContextMenus && extraContextMenus.length > 0) {
                    contextMenuItems.push({ key: "divider", name: "Divider", itemType: ContextualMenu_1.ContextualMenuItemType.Divider });
                    contextMenuItems = contextMenuItems.concat(extraContextMenus);
                }
            }
            return contextMenuItems;
        };
        WorkItemGrid.prototype._renderWorkItemGrid = function () {
            var _this = this;
            if (this.state.loading) {
                return React.createElement(Loading_1.Loading, null);
            }
            else if (this.state.filteredItems.length === 0) {
                return React.createElement(MessagePanel_1.MessagePanel, { message: "No results", messageType: MessagePanel_1.MessageType.Info });
            }
            else {
                var selectionMode = this.props.selectionMode || selection_1.SelectionMode.multiple;
                return React.createElement(DetailsList_1.DetailsList, { layoutMode: DetailsList_1.DetailsListLayoutMode.justified, constrainMode: DetailsList_1.ConstrainMode.horizontalConstrained, selectionMode: selectionMode, isHeaderVisible: true, checkboxVisibility: selectionMode === selection_1.SelectionMode.none ? DetailsList_1.CheckboxVisibility.hidden : DetailsList_1.CheckboxVisibility.onHover, columns: this._getColumns(), onRenderItemColumn: this._onRenderCell, items: this.state.filteredItems, className: this._getClassName("grid"), onItemInvoked: function (item, index) {
                        _this.props.onItemInvoked(item, index);
                    }, selection: this._selection, onItemContextMenu: this._showContextMenu, onColumnHeaderClick: this._onColumnHeaderClick });
            }
        };
        WorkItemGrid.prototype._sortAndFilterWorkItems = function (workItems, sortColumn, sortOrder, filterText) {
            var _this = this;
            var items = (workItems || []).slice();
            if (sortColumn && sortColumn.data.comparer) {
                items = items.sort(function (w1, w2) { return sortColumn.data.comparer(w1, w2, sortColumn.key, sortOrder); });
            }
            if (filterText == null || filterText.trim() === "") {
                return items;
            }
            else {
                return items.filter(function (workItem) {
                    return "" + workItem.id === filterText || _this._doesAnyFieldValueContains(workItem, _this.props.fieldColumns, filterText);
                });
            }
        };
        WorkItemGrid.prototype._doesAnyFieldValueContains = function (workItem, fields, text) {
            for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
                var field = fields_1[_i];
                if (Utils_String.caseInsensitiveContains(workItem.fields[field.referenceName] || "", text)) {
                    return true;
                }
            }
            return false;
        };
        WorkItemGrid.prototype._getColumns = function () {
            var _this = this;
            var columns = [];
            var leftColumns = [];
            var rightColumns = [];
            var extraColumnMapper = function (ec) {
                return {
                    fieldName: ec.key,
                    key: ec.key,
                    name: ec.name,
                    minWidth: ec.minWidth || 50,
                    maxWidth: ec.maxWidth || 100,
                    isResizable: !_this.props.columnsProps.disableColumnResize,
                    data: { type: WorkItemGrid_Props_1.ColumnType.Custom, renderer: ec.renderer, comparer: ec.comparer },
                    isSorted: _this.state.sortColumn && Utils_String.equals(_this.state.sortColumn.key, ec.key, true),
                    isSortedDescending: _this.state.sortOrder && _this.state.sortOrder === WorkItemGrid_Props_1.SortOrder.DESC
                };
            };
            if (this.props.columnsProps.extraColumns && this.props.columnsProps.extraColumns.length > 0) {
                leftColumns = this.props.columnsProps.extraColumns.map(extraColumnMapper);
                rightColumns = this.props.columnsProps.extraColumns.filter(function (ec) { return ec.position !== WorkItemGrid_Props_1.ColumnPosition.FarLeft; }).map(extraColumnMapper);
            }
            if (leftColumns.length > 0) {
                columns = columns.concat(leftColumns);
            }
            columns = columns.concat(this.props.fieldColumns.map(function (f) {
                var columnSize = WorkItemHelpers.getColumnSize(f);
                return {
                    fieldName: f.referenceName,
                    key: f.referenceName,
                    name: f.name,
                    data: { type: WorkItemGrid_Props_1.ColumnType.Field, renderer: WorkItemHelpers.workItemFieldCellRenderer, comparer: WorkItemHelpers.workItemFieldValueComparer },
                    minWidth: columnSize.minWidth,
                    maxWidth: columnSize.maxWidth,
                    isResizable: !_this.props.columnsProps.disableColumnResize,
                    isSorted: _this.state.sortColumn && Utils_String.equals(_this.state.sortColumn.key, f.referenceName, true),
                    isSortedDescending: _this.state.sortOrder && _this.state.sortOrder === WorkItemGrid_Props_1.SortOrder.DESC
                };
            }));
            if (rightColumns.length > 0) {
                columns = columns.concat(rightColumns);
            }
            return columns;
        };
        WorkItemGrid.prototype._onColumnHeaderClick = function (ev, column) {
            if (!this.props.columnsProps.disableSort && column.data.comparer) {
                var sortOrder = column.isSortedDescending ? WorkItemGrid_Props_1.SortOrder.ASC : WorkItemGrid_Props_1.SortOrder.DESC;
                this._updateState({ sortColumn: column, sortOrder: sortOrder, filteredItems: this._sortAndFilterWorkItems(this.state.items, column, sortOrder, this.state.filterText) });
            }
        };
        WorkItemGrid.prototype._onRenderCell = function (item, index, column) {
            if (column.data.type === WorkItemGrid_Props_1.ColumnType.Custom) {
                return column.data.renderer ? column.data.renderer(item, index) : null;
            }
            else {
                return column.data.renderer(item, index, column, { workItemTypeAndStateColors: this.state.workItemTypeAndStateColors });
            }
        };
        WorkItemGrid.prototype._getWiql = function (workItems) {
            var fieldStr = this.props.fieldColumns.map(function (f) { return "[" + f.referenceName + "]"; }).join(",");
            var ids = (workItems || this.state.filteredItems).map(function (w) { return w.id; }).join(",");
            var sortColumn = this.state.sortColumn && this.state.sortColumn.data.type === WorkItemGrid_Props_1.ColumnType.Field ? this.state.sortColumn.key : "System.CreatedDate";
            var sortOrder = this.state.sortOrder === WorkItemGrid_Props_1.SortOrder.DESC ? "DESC" : "";
            return "SELECT " + fieldStr + "\n                 FROM WorkItems \n                 WHERE [System.TeamProject] = @project \n                 AND [System.ID] IN (" + ids + ") \n                 ORDER BY [" + sortColumn + "] " + sortOrder;
        };
        WorkItemGrid.prototype._updateFilterText = function (filterText) {
            var _this = this;
            if (this._searchTimeout) {
                clearTimeout(this._searchTimeout);
                this._searchTimeout = null;
            }
            this._searchTimeout = setTimeout(function () {
                _this._searchTimeout = null;
                _this._updateState({ filterText: filterText, filteredItems: _this._sortAndFilterWorkItems(_this.state.items, _this.state.sortColumn, _this.state.sortOrder, filterText) });
            }, 200);
        };
        WorkItemGrid.prototype._showContextMenu = function (item, index, e) {
            if (!this.props.contextMenuProps.disableContextMenu) {
                if (!this._selection.isIndexSelected(index)) {
                    this._selection.setAllSelected(false);
                    this._selection.setIndexSelected(index, true, true);
                }
                this._updateState({ contextMenuTarget: e, isContextMenuVisible: true });
            }
        };
        WorkItemGrid.prototype._hideContextMenu = function (e) {
            this._updateState({ contextMenuTarget: null, isContextMenuVisible: false });
        };
        WorkItemGrid.prototype._updateState = function (updatedStates) {
            this.setState(__assign({}, this.state, updatedStates));
        };
        WorkItemGrid.prototype._onStoreChanged = function () {
            if (this._context.stores.workItemColorStore.isLoaded()) {
                this._updateState({ workItemTypeAndStateColors: this._context.stores.workItemColorStore.getAll() });
            }
        };
        WorkItemGrid.prototype._getClassName = function (className) {
            if (className) {
                return "work-items-grid-" + className;
            }
            else {
                return "work-items-grid";
            }
        };
        return WorkItemGrid;
    }(React.Component));
    WorkItemGrid.defaultProps = {
        refreshWorkItems: null,
        selectionMode: selection_1.SelectionMode.multiple,
        onItemInvoked: function (item, index) {
            WorkItemHelpers.openWorkItemDialog(null, item);
        },
        columnsProps: {
            disableSort: false,
            disableColumnResize: false,
            extraColumns: []
        },
        commandBarProps: {
            hideSearchBox: false,
            hideCommandBar: false,
            extraCommandMenuItems: [],
            farCommandMenuItems: []
        },
        contextMenuProps: {
            disableContextMenu: false,
            extraContextMenuItems: null
        }
    };
    __decorate([
        Utilities_1.autobind
    ], WorkItemGrid.prototype, "_onColumnHeaderClick", null);
    __decorate([
        Utilities_1.autobind
    ], WorkItemGrid.prototype, "_onRenderCell", null);
    __decorate([
        Utilities_1.autobind
    ], WorkItemGrid.prototype, "_updateFilterText", null);
    __decorate([
        Utilities_1.autobind
    ], WorkItemGrid.prototype, "_showContextMenu", null);
    __decorate([
        Utilities_1.autobind
    ], WorkItemGrid.prototype, "_hideContextMenu", null);
    __decorate([
        Utilities_1.autobind
    ], WorkItemGrid.prototype, "_onStoreChanged", null);
    exports.WorkItemGrid = WorkItemGrid;
});
