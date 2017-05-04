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
define(["require", "exports", "react", "OfficeFabric/DetailsList", "OfficeFabric/utilities/selection", "OfficeFabric/Utilities", "OfficeFabric/ContextualMenu", "OfficeFabric/CommandBar", "OfficeFabric/SearchBox", "OfficeFabric/MessageBar", "VSS/Utils/String", "../Common/BaseComponent", "../Common/Loading", "./Grid.Props", "../../css/WorkItemsGrid.scss"], function (require, exports, React, DetailsList_1, selection_1, Utilities_1, ContextualMenu_1, CommandBar_1, SearchBox_1, MessageBar_1, Utils_String, BaseComponent_1, Loading_1, Grid_Props_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Grid = (function (_super) {
        __extends(Grid, _super);
        function Grid(props, context) {
            var _this = _super.call(this, props, context) || this;
            _this._selection = new selection_1.Selection({
                onSelectionChanged: function () {
                    if (props.events.onSelectionChanged) {
                        props.events.onSelectionChanged(_this._selection.getSelection());
                    }
                }
            });
            return _this;
        }
        Grid.prototype.initializeState = function () {
            this.state = {
                filteredItems: this.props.items.slice(),
                items: this.props.items.slice(),
                sortColumn: null,
                sortOrder: Grid_Props_1.SortOrder.ASC,
                filterText: ""
            };
        };
        Grid.prototype.getDefaultClassName = function () {
            return "base-grid";
        };
        Grid.prototype.render = function () {
            return (React.createElement("div", { className: this.getClassName() },
                this._renderCommandBar(),
                this._renderGrid(),
                this.state.isContextMenuVisible && this.props.contextMenuProps && this.props.contextMenuProps.menuItems && (React.createElement(ContextualMenu_1.ContextualMenu, { className: "context-menu", items: this.props.contextMenuProps.menuItems(this._selection.getSelection()), target: this.state.contextMenuTarget, shouldFocusOnMount: true, onDismiss: this._hideContextMenu }))));
        };
        Grid.prototype._renderCommandBar = function () {
            if (!this.props.commandBarProps || (this.props.commandBarProps.hideSearchBox && this.props.commandBarProps.hideCommandBar)) {
                return null;
            }
            return (React.createElement("div", { className: "menu-bar-container" },
                !this.props.commandBarProps.hideSearchBox && (React.createElement(SearchBox_1.SearchBox, { className: "searchbox", value: this.state.filterText || "", onSearch: this._updateFilterText, onChange: this._updateFilterText })),
                !this.props.commandBarProps.hideCommandBar && (React.createElement(CommandBar_1.CommandBar, { className: "menu-bar", items: this._getCommandMenuItems(), farItems: this._getFarCommandMenuItems() }))));
        };
        Grid.prototype._getCommandMenuItems = function () {
            var _this = this;
            var menuItems = [];
            if (this.props.commandBarProps && this.props.commandBarProps.refreshItems) {
                menuItems.push({
                    key: "refresh", name: "Refresh", title: "Refresh items", iconProps: { iconName: "Refresh" },
                    onClick: function (event, menuItem) { return __awaiter(_this, void 0, void 0, function () {
                        var items;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.updateState({ loading: true });
                                    return [4, this.props.commandBarProps.refreshItems()];
                                case 1:
                                    items = _a.sent();
                                    this.updateState({ loading: false, items: items, filteredItems: this._sortAndFilterWorkItems(items, this.state.sortColumn, this.state.sortOrder, this.state.filterText) });
                                    return [2];
                            }
                        });
                    }); }
                });
            }
            if (this.props.commandBarProps && this.props.commandBarProps.menuItems && this.props.commandBarProps.menuItems.length > 0) {
                menuItems = menuItems.concat(this.props.commandBarProps.menuItems);
            }
            return menuItems;
        };
        Grid.prototype._getFarCommandMenuItems = function () {
            var menuItems = [
                {
                    key: "resultCount",
                    name: this.state.loading ? "Loading ..." : this.state.filteredItems.length + " results",
                    className: "result-count"
                }
            ];
            if (this.props.commandBarProps && this.props.commandBarProps.farMenuItems && this.props.commandBarProps.farMenuItems.length > 0) {
                menuItems = menuItems.concat(this.props.commandBarProps.farMenuItems);
            }
            return menuItems;
        };
        Grid.prototype._renderGrid = function () {
            if (this.state.loading) {
                return React.createElement(Loading_1.Loading, null);
            }
            else if (this.state.filteredItems.length === 0) {
                return React.createElement(MessageBar_1.MessageBar, { messageBarType: MessageBar_1.MessageBarType.info }, "No results");
            }
            else {
                return React.createElement(DetailsList_1.DetailsList, { layoutMode: DetailsList_1.DetailsListLayoutMode.justified, constrainMode: DetailsList_1.ConstrainMode.horizontalConstrained, selectionMode: this.props.selectionMode || selection_1.SelectionMode.multiple, isHeaderVisible: true, checkboxVisibility: this.props.selectionMode === selection_1.SelectionMode.none ? DetailsList_1.CheckboxVisibility.hidden : DetailsList_1.CheckboxVisibility.onHover, columns: this._prepareColumns(), items: this.state.filteredItems, className: "grid", onItemInvoked: this._onItemInvoked, selection: this._selection, onItemContextMenu: this._showContextMenu });
            }
        };
        Grid.prototype._onItemInvoked = function (item, index) {
            if (this.props.onItemInvoked) {
                this.props.onItemInvoked(item, index);
            }
        };
        Grid.prototype._prepareColumns = function () {
            var _this = this;
            return this.props.columns.map(function (column) {
                return {
                    key: column.key,
                    fieldName: column.key,
                    name: column.name,
                    minWidth: column.minWidth,
                    maxWidth: column.maxWidth,
                    isResizable: column.resizable,
                    onRender: function (item, index) { return column.onRenderCell(item, index); },
                    isSorted: column.sortable && Utils_String.equals(_this.state.sortColumn.key, column.key, true),
                    isSortedDescending: column.sortable && _this.state.sortOrder === Grid_Props_1.SortOrder.DESC,
                    onColumnClick: function () { return _this._onColumnHeaderClick(column); }
                };
            });
        };
        Grid.prototype._onColumnHeaderClick = function (column) {
            if (column.sortable) {
                var sortOrder = this.state.sortOrder === Grid_Props_1.SortOrder.DESC ? Grid_Props_1.SortOrder.ASC : Grid_Props_1.SortOrder.DESC;
                var filteredItems = this._sortAndFilterWorkItems(this.state.items, column, sortOrder, this.state.filterText);
                this.updateState({ sortColumn: column, sortOrder: sortOrder, filteredItems: filteredItems });
                if (this.props.events && this.props.events.onSearch) {
                    this.props.events.onSort(column, sortOrder, filteredItems);
                }
            }
        };
        Grid.prototype._updateFilterText = function (filterText) {
            var _this = this;
            if (this._searchTimeout) {
                clearTimeout(this._searchTimeout);
                this._searchTimeout = null;
            }
            this._searchTimeout = setTimeout(function () {
                _this._searchTimeout = null;
                var filteredItems = _this._sortAndFilterWorkItems(_this.state.items, _this.state.sortColumn, _this.state.sortOrder, filterText);
                _this.updateState({ filterText: filterText, filteredItems: filteredItems });
                if (_this.props.events && _this.props.events.onSearch) {
                    _this.props.events.onSearch(filterText, filteredItems);
                }
            }, 200);
        };
        Grid.prototype._showContextMenu = function (item, index, e) {
            if (this.props.contextMenuProps && this.props.contextMenuProps.menuItems) {
                if (!this._selection.isIndexSelected(index)) {
                    this._selection.setAllSelected(false);
                    this._selection.setIndexSelected(index, true, true);
                }
                this.updateState({ contextMenuTarget: e, isContextMenuVisible: true });
            }
        };
        Grid.prototype._hideContextMenu = function () {
            this.updateState({ contextMenuTarget: null, isContextMenuVisible: false });
        };
        Grid.prototype._sortAndFilterWorkItems = function (items, sortColumn, sortOrder, filterText) {
            var _this = this;
            var filteredItems = (items || []).slice();
            if (sortColumn && this.props.itemComparer) {
                filteredItems = filteredItems.sort(function (item1, item2) { return _this.props.itemComparer(item1, item2, sortColumn, sortOrder); });
            }
            if (filterText == null || filterText.trim() === "" || !this.props.itemFilter) {
                return filteredItems;
            }
            else {
                return filteredItems.filter(function (item) { return _this.props.itemFilter(item, filterText); });
            }
        };
        return Grid;
    }(BaseComponent_1.BaseComponent));
    __decorate([
        Utilities_1.autobind
    ], Grid.prototype, "_onItemInvoked", null);
    __decorate([
        Utilities_1.autobind
    ], Grid.prototype, "_onColumnHeaderClick", null);
    __decorate([
        Utilities_1.autobind
    ], Grid.prototype, "_updateFilterText", null);
    __decorate([
        Utilities_1.autobind
    ], Grid.prototype, "_showContextMenu", null);
    __decorate([
        Utilities_1.autobind
    ], Grid.prototype, "_hideContextMenu", null);
    exports.Grid = Grid;
});
