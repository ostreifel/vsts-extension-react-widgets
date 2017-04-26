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
define(["require", "exports", "VSS/Flux/Action", "TFS/WorkItemTracking/RestClient"], function (require, exports, Action_1, WitClient) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ActionsHub = (function () {
        function ActionsHub() {
            this.InitializeWorkItemFields = new Action_1.Action();
            this.InitializeWorkItemTemplates = new Action_1.Action();
            this.InitializeWorkItemTypes = new Action_1.Action();
            this.InitializeWorkItemColors = new Action_1.Action();
            this.WorkItemTemplateItemAdded = new Action_1.Action();
        }
        return ActionsHub;
    }());
    exports.ActionsHub = ActionsHub;
    var ActionsCreator = (function () {
        function ActionsCreator(_actionsHub, _workItemFieldDataProvider, _workItemTemplateDataProvider, _workItemTypeDataProvider, _workItemTemplateItemDataProvider, _workItemColorsDataProvider) {
            this._actionsHub = _actionsHub;
            this._workItemFieldDataProvider = _workItemFieldDataProvider;
            this._workItemTemplateDataProvider = _workItemTemplateDataProvider;
            this._workItemTypeDataProvider = _workItemTypeDataProvider;
            this._workItemTemplateItemDataProvider = _workItemTemplateItemDataProvider;
            this._workItemColorsDataProvider = _workItemColorsDataProvider;
        }
        ActionsCreator.prototype.initializeWorkItemFields = function () {
            return __awaiter(this, void 0, void 0, function () {
                var fields;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this._workItemFieldDataProvider.isLoaded()) return [3 /*break*/, 1];
                            this._actionsHub.InitializeWorkItemFields.invoke(null);
                            return [3 /*break*/, 3];
                        case 1: return [4 /*yield*/, WitClient.getClient().getFields(VSS.getWebContext().project.id)];
                        case 2:
                            fields = _a.sent();
                            this._actionsHub.InitializeWorkItemFields.invoke(fields);
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        ActionsCreator.prototype.initializeWorkItemTemplates = function () {
            return __awaiter(this, void 0, void 0, function () {
                var templates;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this._workItemTemplateDataProvider.isLoaded()) return [3 /*break*/, 1];
                            this._actionsHub.InitializeWorkItemTemplates.invoke(null);
                            return [3 /*break*/, 3];
                        case 1: return [4 /*yield*/, WitClient.getClient().getTemplates(VSS.getWebContext().project.id, VSS.getWebContext().team.id)];
                        case 2:
                            templates = _a.sent();
                            this._actionsHub.InitializeWorkItemTemplates.invoke(templates);
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        ActionsCreator.prototype.initializeWorkItemTypes = function () {
            return __awaiter(this, void 0, void 0, function () {
                var workItemTypes;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this._workItemTypeDataProvider.isLoaded()) return [3 /*break*/, 1];
                            this._actionsHub.InitializeWorkItemTypes.invoke(null);
                            return [3 /*break*/, 3];
                        case 1: return [4 /*yield*/, WitClient.getClient().getWorkItemTypes(VSS.getWebContext().project.id)];
                        case 2:
                            workItemTypes = _a.sent();
                            this._actionsHub.InitializeWorkItemTypes.invoke(workItemTypes);
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        ActionsCreator.prototype.initializeWorkItemColors = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var workItemTypeAndStateColors_1, projectId_1, workItemTypes;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this._workItemColorsDataProvider.isLoaded()) return [3 /*break*/, 1];
                            this._actionsHub.InitializeWorkItemColors.invoke(null);
                            return [3 /*break*/, 4];
                        case 1:
                            workItemTypeAndStateColors_1 = {};
                            projectId_1 = VSS.getWebContext().project.id;
                            return [4 /*yield*/, this.initializeWorkItemTypes()];
                        case 2:
                            _a.sent();
                            workItemTypes = this._workItemTypeDataProvider.getAll();
                            workItemTypes.forEach(function (wit) { return workItemTypeAndStateColors_1[wit.name] = {
                                color: wit.color,
                                stateColors: {}
                            }; });
                            return [4 /*yield*/, Promise.all(workItemTypes.map(function (wit) { return __awaiter(_this, void 0, void 0, function () {
                                    var stateColors;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, WitClient.getClient().getWorkItemTypeStates(projectId_1, wit.name)];
                                            case 1:
                                                stateColors = _a.sent();
                                                stateColors.forEach(function (stateColor) { return workItemTypeAndStateColors_1[wit.name].stateColors[stateColor.name] = stateColor.color; });
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }))];
                        case 3:
                            _a.sent();
                            this._actionsHub.InitializeWorkItemColors.invoke(workItemTypeAndStateColors_1);
                            _a.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        ActionsCreator.prototype.ensureTemplateItem = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var template, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!this._workItemTemplateItemDataProvider.itemExists(id)) return [3 /*break*/, 5];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, WitClient.getClient().getTemplate(VSS.getWebContext().project.id, VSS.getWebContext().team.id, id)];
                        case 2:
                            template = _a.sent();
                            if (template) {
                                this._actionsHub.WorkItemTemplateItemAdded.invoke(template);
                                return [2 /*return*/, true];
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            e_1 = _a.sent();
                            return [2 /*return*/, false];
                        case 4: return [2 /*return*/, false];
                        case 5: return [2 /*return*/, true];
                    }
                });
            });
        };
        return ActionsCreator;
    }());
    exports.ActionsCreator = ActionsCreator;
});
