var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
define(["require", "exports", "TFS/WorkItemTracking/Contracts", "TFS/WorkItemTracking/RestClient", "./BaseStore"], function (require, exports, Contracts_1, WitClient, BaseStore_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AreaPathStore = (function (_super) {
        __extends(AreaPathStore, _super);
        function AreaPathStore() {
            var _this = _super.call(this) || this;
            _this.items = {};
            _this._allowedAreaPaths = {};
            return _this;
        }
        AreaPathStore.prototype.getItemByKey = function (projectId) {
            return this.items[(projectId || VSS.getWebContext().project.id).toLowerCase()];
        };
        AreaPathStore.prototype.initializeItems = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2];
                });
            });
        };
        AreaPathStore.prototype.getAreaPaths = function (projectId) {
            return this._allowedAreaPaths[(projectId || VSS.getWebContext().project.id).toLowerCase()];
        };
        AreaPathStore.prototype.ensureAreaPathNode = function (projectId) {
            return __awaiter(this, void 0, void 0, function () {
                var node, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!this.itemExists(projectId)) return [3, 5];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4, WitClient.getClient().getClassificationNode(projectId || VSS.getWebContext().project.id, Contracts_1.TreeStructureGroup.Areas, null, 5)];
                        case 2:
                            node = _a.sent();
                            if (node) {
                                this._onAdd(node, projectId || VSS.getWebContext().project.id);
                                return [2, true];
                            }
                            else {
                                return [2, false];
                            }
                            return [3, 4];
                        case 3:
                            e_1 = _a.sent();
                            return [2, false];
                        case 4: return [3, 6];
                        case 5:
                            this.emitChanged();
                            return [2, true];
                        case 6: return [2];
                    }
                });
            });
        };
        AreaPathStore.prototype.getKey = function () {
            return "AreaPathStore";
        };
        AreaPathStore.prototype._onAdd = function (item, projectId) {
            if (!item || !projectId) {
                return;
            }
            if (!this.items) {
                this.items = {};
            }
            if (!this._allowedAreaPaths) {
                this._allowedAreaPaths = {};
            }
            this.items[projectId.toLowerCase()] = item;
            this._allowedAreaPaths[projectId.toLowerCase()] = this._getNodePaths(item);
            this.emitChanged();
        };
        AreaPathStore.prototype._getNodePaths = function (node, parentNodeName) {
            var nodeName = parentNodeName ? parentNodeName + "\\" + node.name : node.name;
            var returnData = [nodeName];
            if (node.children) {
                for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
                    var child = _a[_i];
                    returnData = returnData.concat(this._getNodePaths(child, nodeName));
                }
            }
            return returnData;
        };
        return AreaPathStore;
    }(BaseStore_1.BaseStore));
    exports.AreaPathStore = AreaPathStore;
});
