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
define(["require", "exports", "react", "TFS/WorkItemTracking/Contracts", "TFS/WorkItemTracking/Services", "VSS/Utils/String", "VSS/Utils/Date", "OfficeFabric/Tooltip", "OfficeFabric/Label", "../Grid.Props", "../../WorkItemControls/IdentityView", "../../WorkItemControls/TagsView"], function (require, exports, React, Contracts_1, Services_1, Utils_String, Utils_Date, Tooltip_1, Label_1, Grid_Props_1, IdentityView_1, TagsView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function workItemFieldValueComparer(w1, w2, fieldRefName, sortOrder) {
        if (Utils_String.equals(fieldRefName, "System.Id", true)) {
            return sortOrder === Grid_Props_1.SortOrder.DESC ? ((w1.id > w2.id) ? -1 : 1) : ((w1.id > w2.id) ? 1 : -1);
        }
        else {
            var v1 = w1.fields[fieldRefName];
            var v2 = w2.fields[fieldRefName];
            return sortOrder === Grid_Props_1.SortOrder.DESC ? -1 * Utils_String.ignoreCaseComparer(v1, v2) : Utils_String.ignoreCaseComparer(v1, v2);
        }
    }
    exports.workItemFieldValueComparer = workItemFieldValueComparer;
    function workItemFieldCellRenderer(item, field, extraData) {
        var text = item.fields[field.referenceName] || "";
        var className = "work-item-grid-cell";
        var innerElement;
        if (field.type === Contracts_1.FieldType.DateTime) {
            var dateStr = item.fields[field.referenceName];
            if (!dateStr) {
                text = "";
            }
            else {
                var date = new Date(dateStr);
                text = Utils_Date.format(date, "M/d/yyyy h:mm tt");
            }
            innerElement = React.createElement(Label_1.Label, { className: className }, text);
        }
        else if (field.type === Contracts_1.FieldType.Boolean) {
            var boolValue = item.fields[field.referenceName];
            text = boolValue == null ? "" : (!boolValue ? "False" : "True");
            innerElement = React.createElement(Label_1.Label, { className: className }, text);
        }
        else {
            switch (field.referenceName.toLowerCase()) {
                case "system.id":
                    text = item.id.toString();
                    innerElement = React.createElement(Label_1.Label, { className: className }, text);
                    break;
                case "system.title":
                    var witColor = extraData && extraData.workItemTypeAndStateColors &&
                        extraData.workItemTypeAndStateColors[item.fields["System.WorkItemType"]] &&
                        extraData.workItemTypeAndStateColors[item.fields["System.WorkItemType"]].color;
                    innerElement = (React.createElement(Label_1.Label, { className: className + " title-cell", onClick: function (e) { return openWorkItemDialog(e, item); }, style: { borderColor: witColor ? "#" + witColor : "#000" } }, item.fields[field.referenceName]));
                    break;
                case "system.state":
                    innerElement = (React.createElement(Label_1.Label, { className: className + " state-cell" },
                        extraData &&
                            extraData.workItemTypeAndStateColors &&
                            extraData.workItemTypeAndStateColors[item.fields["System.WorkItemType"]] &&
                            extraData.workItemTypeAndStateColors[item.fields["System.WorkItemType"]].stateColors &&
                            extraData.workItemTypeAndStateColors[item.fields["System.WorkItemType"]].stateColors[item.fields["System.State"]] &&
                            React.createElement("span", { className: "work-item-type-state-color", style: {
                                    backgroundColor: "#" + extraData.workItemTypeAndStateColors[item.fields["System.WorkItemType"]].stateColors[item.fields["System.State"]],
                                    borderColor: "#" + extraData.workItemTypeAndStateColors[item.fields["System.WorkItemType"]].stateColors[item.fields["System.State"]]
                                } }),
                        React.createElement("span", { className: "state-name" }, item.fields[field.referenceName])));
                    break;
                case "system.assignedto":
                    innerElement = React.createElement(IdentityView_1.IdentityView, { identityDistinctName: item.fields[field.referenceName] });
                    break;
                case "system.tags":
                    var tagsArr = (item.fields[field.referenceName] || "").split(";");
                    innerElement = React.createElement(TagsView_1.TagsView, { tags: tagsArr });
                    break;
                default:
                    innerElement = React.createElement(Label_1.Label, { className: className }, item.fields[field.referenceName]);
                    break;
            }
        }
        return (React.createElement(Tooltip_1.TooltipHost, { content: text, delay: Tooltip_1.TooltipDelay.zero, overflowMode: Tooltip_1.TooltipOverflowMode.Parent, directionalHint: Tooltip_1.DirectionalHint.bottomLeftEdge }, innerElement));
    }
    exports.workItemFieldCellRenderer = workItemFieldCellRenderer;
    function getColumnSize(field) {
        if (Utils_String.equals(field.referenceName, "System.Id", true)) {
            return { minWidth: 40, maxWidth: 70 };
        }
        else if (Utils_String.equals(field.referenceName, "System.WorkItemType", true)) {
            return { minWidth: 50, maxWidth: 100 };
        }
        else if (Utils_String.equals(field.referenceName, "System.Title", true)) {
            return { minWidth: 150, maxWidth: 300 };
        }
        else if (Utils_String.equals(field.referenceName, "System.State", true)) {
            return { minWidth: 50, maxWidth: 100 };
        }
        else if (Utils_String.equals(field.referenceName, "System.Tags", true)) {
            return { minWidth: 100, maxWidth: 250 };
        }
        else if (field.type === Contracts_1.FieldType.TreePath) {
            return { minWidth: 150, maxWidth: 350 };
        }
        else if (field.type === Contracts_1.FieldType.Boolean) {
            return { minWidth: 40, maxWidth: 70 };
        }
        else if (field.type === Contracts_1.FieldType.DateTime) {
            return { minWidth: 80, maxWidth: 150 };
        }
        else if (field.type === Contracts_1.FieldType.Double ||
            field.type === Contracts_1.FieldType.Integer ||
            field.type === Contracts_1.FieldType.PicklistDouble ||
            field.type === Contracts_1.FieldType.PicklistInteger) {
            return { minWidth: 50, maxWidth: 100 };
        }
        else {
            return { minWidth: 100, maxWidth: 250 };
        }
    }
    exports.getColumnSize = getColumnSize;
    function openWorkItemDialog(e, item) {
        return __awaiter(this, void 0, void 0, function () {
            var newTab, workItemNavSvc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newTab = e ? e.ctrlKey : false;
                        return [4, Services_1.WorkItemFormNavigationService.getService()];
                    case 1:
                        workItemNavSvc = _a.sent();
                        workItemNavSvc.openWorkItem(item.id, newTab);
                        return [2];
                }
            });
        });
    }
    exports.openWorkItemDialog = openWorkItemDialog;
});
