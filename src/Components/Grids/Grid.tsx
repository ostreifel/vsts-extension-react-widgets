import "../../css/WorkItemsGrid.scss";

import * as React from "react";

import { DetailsList, DetailsListLayoutMode, IColumn, CheckboxVisibility, ConstrainMode } from "OfficeFabric/DetailsList";
import { Selection, SelectionMode } from "OfficeFabric/utilities/selection";
import { autobind } from "OfficeFabric/Utilities";
import { ContextualMenu, IContextualMenuItem } from "OfficeFabric/ContextualMenu";
import { CommandBar } from "OfficeFabric/CommandBar";
import { SearchBox } from "OfficeFabric/SearchBox";
import { MessageBar, MessageBarType } from 'OfficeFabric/MessageBar';

import Utils_String = require("VSS/Utils/String");

import { BaseComponent } from "../Common/BaseComponent"; 
import { Loading } from "../Common/Loading";
import { IGridProps, IGridState, SortOrder, GridColumn } from "./Grid.Props";

export abstract class Grid extends BaseComponent<IGridProps, IGridState> {
    private _selection: Selection;
    private _searchTimeout: any

    constructor(props: IGridProps, context?: any) {
        super(props, context);
        this._selection = new Selection({
            onSelectionChanged: () => {
                if (props.events.onSelectionChanged) {
                    props.events.onSelectionChanged(this._selection.getSelection());
                }
            }
        });
    }    

    protected initializeState() {
        this.state = {
            filteredItems: this.props.items.slice(),
            items: this.props.items.slice(),
            sortColumn: null,
            sortOrder: SortOrder.ASC,
            filterText: ""
        };
    }

    protected getDefaultClassName(): string {
        return "base-grid";
    }

    public render(): JSX.Element {
        return (
            <div className={this.getClassName()}>
                {this._renderCommandBar()}
                {this._renderGrid()}
                {this.state.isContextMenuVisible && this.props.contextMenuProps && this.props.contextMenuProps.menuItems && (
                    <ContextualMenu
                        className="context-menu"
                        items={this.props.contextMenuProps.menuItems(this._selection.getSelection())}
                        target={this.state.contextMenuTarget}
                        shouldFocusOnMount={true}
                        onDismiss={this._hideContextMenu}
                    />
                )}
            </div>
        );
    }

    private _renderCommandBar(): JSX.Element {
        if (!this.props.commandBarProps || (this.props.commandBarProps.hideSearchBox && this.props.commandBarProps.hideCommandBar)) {
            return null;
        }

        return (
            <div className="menu-bar-container">
                {!this.props.commandBarProps.hideSearchBox && (
                    <SearchBox 
                        className="searchbox"
                        value={this.state.filterText || ""}
                        onSearch={this._updateFilterText}
                        onChange={this._updateFilterText} />
                )}

                {!this.props.commandBarProps.hideCommandBar && (
                    <CommandBar 
                        className="menu-bar"
                        items={this._getCommandMenuItems()} 
                        farItems={this._getFarCommandMenuItems()} />
                )}
            </div>
        );
    }    

    private _getCommandMenuItems(): IContextualMenuItem[] {
        let menuItems: IContextualMenuItem[] = [];
        
        if (this.props.commandBarProps && this.props.commandBarProps.refreshItems) {
            menuItems.push({
                key: "refresh", name: "Refresh", title: "Refresh items", iconProps: {iconName: "Refresh"},
                onClick: async (event?: React.MouseEvent<HTMLElement>, menuItem?: IContextualMenuItem) => {
                    this.updateState({loading: true});
                    const items = await this.props.commandBarProps.refreshItems();
                    this.updateState({loading: false, items: items, filteredItems: this._sortAndFilterWorkItems(items, this.state.sortColumn, this.state.sortOrder, this.state.filterText)});
                }
            });
        }

        if (this.props.commandBarProps && this.props.commandBarProps.menuItems && this.props.commandBarProps.menuItems.length > 0) {
            menuItems = menuItems.concat(this.props.commandBarProps.menuItems);
        }

        return menuItems;
    }

    private _getFarCommandMenuItems(): IContextualMenuItem[] {
        let menuItems: IContextualMenuItem[] = [
            {
                key: "resultCount", 
                name: this.state.loading ? "Loading ..." : `${this.state.filteredItems.length} results`, 
                className: "result-count"
            }
        ];

        if (this.props.commandBarProps && this.props.commandBarProps.farMenuItems && this.props.commandBarProps.farMenuItems.length > 0) {
            menuItems = menuItems.concat(this.props.commandBarProps.farMenuItems);
        }

        return menuItems;
    }

    private _renderGrid(): JSX.Element {
        if (this.state.loading) {
            return <Loading />;
        }
        else if (this.state.filteredItems.length === 0) {
            return <MessageBar messageBarType={MessageBarType.info}>No results</MessageBar>;
        }
        else {
            return <DetailsList 
                        layoutMode={DetailsListLayoutMode.justified}
                        constrainMode={ConstrainMode.horizontalConstrained}
                        selectionMode={this.props.selectionMode || SelectionMode.multiple}
                        isHeaderVisible={true}
                        checkboxVisibility={this.props.selectionMode === SelectionMode.none ? CheckboxVisibility.hidden : CheckboxVisibility.onHover}
                        columns={this._prepareColumns()}
                        items={this.state.filteredItems}
                        className="grid"
                        onItemInvoked={this._onItemInvoked}
                        selection={this._selection}
                        onItemContextMenu={this._showContextMenu}
                    />;
        }
    }

    @autobind
    private _onItemInvoked(item: any, index: number) {
        if (this.props.onItemInvoked) {
            this.props.onItemInvoked(item, index);
        }
    }

    private _prepareColumns(): IColumn[] {
        return this.props.columns.map(column => {
            return {
                key: column.key,
                fieldName: column.key,
                name: column.name,
                minWidth: column.minWidth,
                maxWidth: column.maxWidth,
                isResizable: column.resizable,
                onRender: (item?: any, index?: number) => column.onRenderCell(item, index),
                isSorted: column.sortable && Utils_String.equals(this.state.sortColumn.key, column.key, true),
                isSortedDescending: column.sortable && this.state.sortOrder === SortOrder.DESC,
                onColumnClick: () => this._onColumnHeaderClick(column)
            }
        });
    }

    @autobind
    private _onColumnHeaderClick(column: GridColumn) {
        if (column.sortable) {
            const sortOrder = this.state.sortOrder === SortOrder.DESC ? SortOrder.ASC : SortOrder.DESC;
            const filteredItems = this._sortAndFilterWorkItems(this.state.items, column, sortOrder, this.state.filterText);
            this.updateState({sortColumn: column, sortOrder: sortOrder, filteredItems: filteredItems});

            if (this.props.events && this.props.events.onSearch) {
                this.props.events.onSort(column, sortOrder, filteredItems);
            }
        }
    }

    @autobind
    private _updateFilterText(filterText: string): void {
        if (this._searchTimeout) {
            clearTimeout(this._searchTimeout);
            this._searchTimeout = null;
        }

        this._searchTimeout = setTimeout(() => {
            this._searchTimeout = null;
            const filteredItems = this._sortAndFilterWorkItems(this.state.items, this.state.sortColumn, this.state.sortOrder, filterText);
            this.updateState({filterText: filterText, filteredItems: filteredItems});

            if (this.props.events && this.props.events.onSearch) {
                this.props.events.onSearch(filterText, filteredItems);
            }
        }, 200)
    }

    @autobind
    private _showContextMenu(item?: any, index?: number, e?: MouseEvent) {
        if (this.props.contextMenuProps && this.props.contextMenuProps.menuItems) {
            if (!this._selection.isIndexSelected(index)) {
                // if not already selected, unselect every other row and select this one
                this._selection.setAllSelected(false);
                this._selection.setIndexSelected(index, true, true);
            }        
            this.updateState({contextMenuTarget: e, isContextMenuVisible: true});
        }
    }

    @autobind
    private _hideContextMenu() {
        this.updateState({contextMenuTarget: null, isContextMenuVisible: false});
    }

    private _sortAndFilterWorkItems(items: any[], sortColumn: GridColumn, sortOrder: SortOrder, filterText: string): any[] {
        let filteredItems = (items || []).slice();
        if (sortColumn && this.props.itemComparer) {
            filteredItems = filteredItems.sort((item1: any, item2: any) => this.props.itemComparer(item1, item2, sortColumn, sortOrder));
        }

        if (filterText == null || filterText.trim() === "" || !this.props.itemFilter) {
            return filteredItems;
        }
        else {
            return filteredItems.filter((item: any) => this.props.itemFilter(item, filterText));
        }
    }
}