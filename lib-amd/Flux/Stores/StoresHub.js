define(["require", "exports", "./WorkItemFieldStore", "./WorkItemTemplateStore", "./WorkItemTemplateItemStore", "./WorkItemTypeStore", "./WorkItemColorStore"], function (require, exports, WorkItemFieldStore_1, WorkItemTemplateStore_1, WorkItemTemplateItemStore_1, WorkItemTypeStore_1, WorkItemColorStore_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StoresHub = (function () {
        function StoresHub(actions) {
            this.workItemFieldStore = new WorkItemFieldStore_1.WorkItemFieldStore(actions);
            this.workItemTemplateStore = new WorkItemTemplateStore_1.WorkItemTemplateStore(actions);
            this.workItemTypeStore = new WorkItemTypeStore_1.WorkItemTypeStore(actions);
            this.workItemTemplateItemStore = new WorkItemTemplateItemStore_1.WorkItemTemplateItemStore(actions);
            this.workItemColorStore = new WorkItemColorStore_1.WorkItemColorStore(actions);
        }
        return StoresHub;
    }());
    exports.StoresHub = StoresHub;
});
