define(["require", "exports", "./Stores/StoresHub", "./Actions/ActionsCreator"], function (require, exports, StoresHub_1, ActionsCreator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FluxContext = (function () {
        function FluxContext() {
        }
        FluxContext.get = function () {
            if (!this._instance) {
                var actionsHub = new ActionsCreator_1.ActionsHub();
                var storeHub = new StoresHub_1.StoresHub(actionsHub);
                var actionsCreator = new ActionsCreator_1.ActionsCreator(actionsHub, storeHub.workItemFieldStore, storeHub.workItemTemplateStore, storeHub.workItemTypeStore, storeHub.workItemTemplateItemStore, storeHub.workItemColorStore);
                this._instance = {
                    actions: actionsHub,
                    stores: storeHub,
                    actionsCreator: actionsCreator
                };
            }
            return this._instance;
        };
        return FluxContext;
    }());
    exports.FluxContext = FluxContext;
});
