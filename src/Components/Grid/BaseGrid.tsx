import "../../css/WorkItemsGrid.scss";

import * as React from "react";

import { DetailsList, DetailsListLayoutMode, IColumn, CheckboxVisibility, ConstrainMode } from "OfficeFabric/DetailsList";
import { Selection, SelectionMode } from "OfficeFabric/utilities/selection";
import { autobind } from "OfficeFabric/Utilities";
import { ContextualMenu, IContextualMenuItem, ContextualMenuItemType } from "OfficeFabric/ContextualMenu";
import { CommandBar } from "OfficeFabric/CommandBar";
import { SearchBox } from "OfficeFabric/SearchBox";
import { MessageBar, MessageBarType } from 'OfficeFabric/MessageBar';

import Utils_String = require("VSS/Utils/String");

import { Loading } from "../Common/Loading";
import {IBaseGridProps, IBaseGridState} from "./BaseGrid.Props";

export class BaseGrid<TItem> extends React.Component<IBaseGridProps<TItem>, IBaseGridState<TItem>> {
    
}