define(["require", "exports", "VSS/Flux/Action"], function (require, exports, Action_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WorkItemTypeActionsCreator;
    (function (WorkItemTypeActionsCreator) {
        WorkItemTypeActionsCreator.InitializeWorkItemTypes = new Action_1.Action();
    })(WorkItemTypeActionsCreator = exports.WorkItemTypeActionsCreator || (exports.WorkItemTypeActionsCreator = {}));
    var WorkItemFieldActionsCreator;
    (function (WorkItemFieldActionsCreator) {
        WorkItemFieldActionsCreator.InitializeWorkItemFields = new Action_1.Action();
    })(WorkItemFieldActionsCreator = exports.WorkItemFieldActionsCreator || (exports.WorkItemFieldActionsCreator = {}));
    var WorkItemTemplateActionsCreator;
    (function (WorkItemTemplateActionsCreator) {
        WorkItemTemplateActionsCreator.InitializeWorkItemTemplates = new Action_1.Action();
    })(WorkItemTemplateActionsCreator = exports.WorkItemTemplateActionsCreator || (exports.WorkItemTemplateActionsCreator = {}));
    var WorkItemTemplateItemActionsCreator;
    (function (WorkItemTemplateItemActionsCreator) {
        WorkItemTemplateItemActionsCreator.InitializeWorkItemTemplateItem = new Action_1.Action();
    })(WorkItemTemplateItemActionsCreator = exports.WorkItemTemplateItemActionsCreator || (exports.WorkItemTemplateItemActionsCreator = {}));
    var WorkItemStateItemActionsCreator;
    (function (WorkItemStateItemActionsCreator) {
        WorkItemStateItemActionsCreator.InitializeWorkItemStateItems = new Action_1.Action();
    })(WorkItemStateItemActionsCreator = exports.WorkItemStateItemActionsCreator || (exports.WorkItemStateItemActionsCreator = {}));
});
