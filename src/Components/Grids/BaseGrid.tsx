import "../../css/WorkItemsGrid.scss";

import * as React from "react";

import { DetailsList, DetailsListLayoutMode, IColumn, CheckboxVisibility, ConstrainMode } from "OfficeFabric/DetailsList";
import { Selection, SelectionMode } from "OfficeFabric/utilities/selection";
import { autobind } from "OfficeFabric/Utilities";
import { ContextualMenu, IContextualMenuItem } from "OfficeFabric/ContextualMenu";
import { CommandBar } from "OfficeFabric/CommandBar";
import { SearchBox } from "OfficeFabric/SearchBox";
import { MessageBar, MessageBarType } from 'OfficeFabric/MessageBar';

import { BaseComponent } from "../Common/BaseComponent"; 
import { Loading } from "../Common/Loading";
import { IBaseGridProps, IBaseGridState, SortOrder } from "./BaseGrid.Props";

export abstract class BaseGrid<TItem, TColumn, TProps extends IBaseGridProps<TItem, TColumn>, TState extends IBaseGridState<TItem>> extends BaseComponent<TProps, TState> {
    static defaultProps = {        
        columns: [],
        items: [],
        refreshItems: null,
        selectionMode: SelectionMode.multiple,
        columnsProps: {
            disableSort: false,
            disableColumnResize: false,
        },
        commandBarProps: {
            hideSearchBox: false,
            hideCommandBar: false,
            disableRefresh: false
        },
        contextMenuProps: {
            disableContextMenu: false
        }
    };

    protected selection: Selection;
    private _searchTimeout: any

    constructor(props: TProps, context?: any) {
        super(props, context);
        this.selection = new Selection();
    }

    public render(): JSX.Element {
        return (
            <div className={this.getClassName()}>
                {this._renderCommandBar()}
                {this._renderGrid()}
                {this.state.isContextMenuVisible && !this.props.contextMenuProps.disableContextMenu && (
                    <ContextualMenu
                        className={this.getClassName("context-menu")}
                        items={this.getContextMenuItems()}
                        target={this.state.contextMenuTarget}
                        shouldFocusOnMount={ true }
                        onDismiss={this._hideContextMenu}
                    />
                )}
            </div>
        );
    }

    protected initializeState() {
        this.state = {
            filteredItems: this.props.items || [],
            items: this.props.items || [],
            sortColumnKey: "",
            sortOrder: SortOrder.ASC,
            filterText: ""
        } as TState;
    }

    protected getComponentKey(): string {
        return "base-grid";
    }    

    protected getCommandMenuItems(): IContextualMenuItem[] {
        let menuItems: IContextualMenuItem[] = [];
        
        if (!this.props.commandBarProps.disableRefresh) {
            menuItems.push({
                key: "refresh", name: "Refresh", title: "Refresh items", iconProps: {iconName: "Refresh"},
                onClick: async (event?: React.MouseEvent<HTMLElement>, menuItem?: IContextualMenuItem) => {
                    this.updateState({loading: true} as TState);
                    const items = await this.refreshItems();
                    this.updateState({loading: false, items: items, filteredItems: this._sortAndFilterWorkItems(items, this.state.sortColumnKey, this.state.sortOrder, this.state.filterText)} as TState);
                }
            });
        }

        return menuItems;
    }

    protected async refreshItems(): Promise<TItem[]> {
        if (this.props.refreshItems) {
            return this.props.refreshItems();
        }

        return [];
    }

    protected getFarCommandMenuItems(): IContextualMenuItem[] {
        let menuItems: IContextualMenuItem[] = [
            {
                key: "resultCount", 
                name: this.state.loading ? "Loading ..." : `${this.state.filteredItems.length} results`, 
                className: this.getClassName("result-count")
            }
        ];

        return menuItems;
    }

    protected getContextMenuItems(): IContextualMenuItem[] {        
        return [];
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
                        selectionMode={this.props.selectionMode}
                        isHeaderVisible={true}
                        checkboxVisibility={this.props.selectionMode === SelectionMode.none ? CheckboxVisibility.hidden : CheckboxVisibility.onHover}
                        columns={this.getColumns(this.props.columns)}
                        onRenderItemColumn={(item: TItem, index: number, column: IColumn) => this.onRenderCell(item, index, column)}
                        items={this.state.filteredItems}
                        className={this.getClassName("grid")}
                        onItemInvoked={(item: TItem, index: number, ev?: Event) => this.onItemInvoked(item, index, ev)}
                        selection={ this.selection }
                        onItemContextMenu={this._showContextMenu}
                        onColumnHeaderClick={this._onColumnHeaderClick}
                    />;
        }
    }    

    protected itemComparer(item1: TItem, item2: TItem, sortColumnKey: string, sortOrder: SortOrder): number {
        return 0;
    }

    protected itemFilter(item: TItem, filterText: string): boolean {
        return true;
    }

    protected async onItemInvoked(item: TItem, index: number, ev?: Event) {

    }

    protected getColumns(columns: TColumn[]): IColumn[] {
        return columns.map(column => this.columnMapper(column));
    }

    protected abstract columnMapper(column: TColumn): IColumn;
    protected abstract onRenderCell(item: TItem, index: number, column: IColumn): React.ReactNode;

    private _renderCommandBar(): JSX.Element {
        return (
            <div className={this.getClassName("menu-bar-container")}>
                {!this.props.commandBarProps.hideSearchBox && (
                    <SearchBox 
                        className={this.getClassName("searchbox")}
                        value={this.state.filterText || ""}
                        onSearch={this._updateFilterText}
                        onChange={this._updateFilterText} />
                )}

                {!this.props.commandBarProps.hideCommandBar && (
                    <CommandBar 
                        className={this.getClassName("menu-bar")}
                        items={this.getCommandMenuItems()} 
                        farItems={this.getFarCommandMenuItems()} />
                )}
            </div>
        );
    }    

    @autobind
    private _onColumnHeaderClick(ev: React.MouseEvent<HTMLElement>, column: IColumn) {
        if (!this.props.columnsProps.disableSort) {
            const sortOrder = column.isSortedDescending ? SortOrder.ASC : SortOrder.DESC;
            this.updateState({sortColumnKey: column.key, sortOrder: sortOrder, filteredItems: this._sortAndFilterWorkItems(this.state.items, column.key, sortOrder, this.state.filterText)} as TState);
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
            this.updateState({filterText: filterText, filteredItems: this._sortAndFilterWorkItems(this.state.items, this.state.sortColumnKey, this.state.sortOrder, filterText)} as TState);
        }, 200)
    }

    @autobind
    private _showContextMenu(item?: TItem, index?: number, e?: MouseEvent) {
        if (!this.props.contextMenuProps.disableContextMenu) {
            if (!this.selection.isIndexSelected(index)) {
                // if not already selected, unselect every other row and select this one
                this.selection.setAllSelected(false);
                this.selection.setIndexSelected(index, true, true);
            }        
            this.updateState({contextMenuTarget: e, isContextMenuVisible: true} as TState);
        }
    }

    @autobind
    private _hideContextMenu() {
        this.updateState({contextMenuTarget: null, isContextMenuVisible: false} as TState);
    }

    private _sortAndFilterWorkItems(items: TItem[], sortColumnKey: string, sortOrder: SortOrder, filterText: string): TItem[] {
        let filteredItems = (items || []).slice();
        if (sortColumnKey) {
            filteredItems = filteredItems.sort((item1: TItem, item2: TItem) => this.itemComparer(item1, item2, sortColumnKey, sortOrder));
        }

        if (filterText == null || filterText.trim() === "") {
            return filteredItems;
        }
        else {
            return filteredItems.filter((item: TItem) => this.itemFilter(item, filterText));
        }
    }
}