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
define(["require", "exports", "react", "TFS/WorkItemTracking/Contracts", "TFS/WorkItemTracking/Services", "VSS/Utils/String", "./WorkItemGrid.Props", "../Common/IdentityView"], function (require, exports, React, Contracts_1, Services_1, Utils_String, WorkItemGrid_Props_1, IdentityView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function workItemFieldValueComparer(w1, w2, fieldRefName, sortOrder) {
        if (Utils_String.equals(fieldRefName, "System.Id", true)) {
            return sortOrder === WorkItemGrid_Props_1.SortOrder.DESC ? ((w1.id > w2.id) ? -1 : 1) : ((w1.id > w2.id) ? 1 : -1);
        }
        else {
            var v1 = w1.fields[fieldRefName];
            var v2 = w2.fields[fieldRefName];
            return sortOrder === WorkItemGrid_Props_1.SortOrder.DESC ? -1 * Utils_String.ignoreCaseComparer(v1, v2) : Utils_String.ignoreCaseComparer(v1, v2);
        }
    }
    exports.workItemFieldValueComparer = workItemFieldValueComparer;
    function workItemFieldCellRenderer(item, index, column, extraData) {
        var text;
        switch (column.fieldName.toLowerCase()) {
            case "system.id":
                text = item.id.toString();
                break;
            case "system.title":
                var witColor = extraData && extraData.workItemTypeAndStateColors &&
                    extraData.workItemTypeAndStateColors[item.fields["System.WorkItemType"]] &&
                    extraData.workItemTypeAndStateColors[item.fields["System.WorkItemType"]].color;
                return (React.createElement("div", { className: "title-cell", title: item.fields[column.fieldName] },
                    React.createElement("span", { className: "overflow-ellipsis", onClick: function (e) { return openWorkItemDialog(e, item); }, style: { borderColor: witColor ? "#" + witColor : "#000" } }, item.fields[column.fieldName])));
            case "system.state":
                return (React.createElement("div", { className: "state-cell", title: item.fields[column.fieldName] },
                    extraData &&
                        extraData.workItemTypeAndStateColors &&
                        extraData.workItemTypeAndStateColors[item.fields["System.WorkItemType"]] &&
                        extraData.workItemTypeAndStateColors[item.fields["System.WorkItemType"]].stateColors &&
                        extraData.workItemTypeAndStateColors[item.fields["System.WorkItemType"]].stateColors[item.fields["System.State"]] &&
                        React.createElement("span", { className: "work-item-type-state-color", style: {
                                backgroundColor: "#" + extraData.workItemTypeAndStateColors[item.fields["System.WorkItemType"]].stateColors[item.fields["System.State"]],
                                borderColor: "#" + extraData.workItemTypeAndStateColors[item.fields["System.WorkItemType"]].stateColors[item.fields["System.State"]]
                            } }),
                    React.createElement("span", { className: "overflow-ellipsis" }, item.fields[column.fieldName])));
            case "system.assignedto":
                return React.createElement(IdentityView_1.IdentityView, { identityDistinctName: item.fields[column.fieldName] });
            default:
                text = item.fields[column.fieldName];
                break;
        }
        return React.createElement("div", { className: "overflow-ellipsis", title: text }, text);
    }
    exports.workItemFieldCellRenderer = workItemFieldCellRenderer;
    function getColumnSize(field) {
        if (Utils_String.equals(field.referenceName, "System.Id", true)) {
            return { minWidth: 40, maxWidth: 70 };
        }
        else if (Utils_String.equals(field.referenceName, "System.WorkItemType", true)) {
            return { minWidth: 80, maxWidth: 100 };
        }
        else if (Utils_String.equals(field.referenceName, "System.Title", true)) {
            return { minWidth: 150, maxWidth: 300 };
        }
        else if (Utils_String.equals(field.referenceName, "System.State", true)) {
            return { minWidth: 70, maxWidth: 120 };
        }
        else if (field.type === Contracts_1.FieldType.TreePath) {
            return { minWidth: 150, maxWidth: 350 };
        }
        else if (field.type === Contracts_1.FieldType.Boolean) {
            return { minWidth: 40, maxWidth: 40 };
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
                        return [4 /*yield*/, Services_1.WorkItemFormNavigationService.getService()];
                    case 1:
                        workItemNavSvc = _a.sent();
                        workItemNavSvc.openWorkItem(item.id, newTab);
                        return [2 /*return*/];
                }
            });
        });
    }
    exports.openWorkItemDialog = openWorkItemDialog;
});
