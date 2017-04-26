import { StoresHub } from "./Stores/StoresHub";
import { ActionsHub, ActionsCreator } from "./Actions/ActionsCreator";
export declare class FluxContext {
    private static _instance;
    actions: ActionsHub;
    stores: StoresHub;
    actionsCreator: ActionsCreator;
    static get(): FluxContext;
}
