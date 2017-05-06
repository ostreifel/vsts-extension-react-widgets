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
define(["require", "exports", "VSS/Flux/Store"], function (require, exports, Store_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseStore = (function (_super) {
        __extends(BaseStore, _super);
        function BaseStore() {
            var _this = _super.call(this) || this;
            _this.items = null;
            _this._isLoading = false;
            return _this;
        }
        BaseStore.prototype.isLoaded = function () {
            return this.items != null ? true : false;
        };
        BaseStore.prototype.isLoading = function () {
            return !this.isLoaded() && this._isLoading;
        };
        BaseStore.prototype.itemExists = function (key) {
            if (!this.isLoaded()) {
                return false;
            }
            return this.getItem(key) != null ? true : false;
        };
        BaseStore.prototype.getItem = function (key) {
            if (!this.isLoaded()) {
                return null;
            }
            return this.getItemByKey(key);
        };
        BaseStore.prototype.getAll = function () {
            return this.items;
        };
        BaseStore.prototype.initialize = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.isLoaded()) return [3, 1];
                            this.emitChanged();
                            return [3, 3];
                        case 1:
                            if (!!this.isLoading()) return [3, 3];
                            this._isLoading = true;
                            return [4, this.initializeItems()];
                        case 2:
                            _a.sent();
                            this._isLoading = false;
                            this.emitChanged();
                            _a.label = 3;
                        case 3: return [2];
                    }
                });
            });
        };
        return BaseStore;
    }(Store_1.Store));
    exports.BaseStore = BaseStore;
    var StoreFactory;
    (function (StoreFactory) {
        var storeInstances = {};
        function getInstance(type) {
            var instance = new type();
            if (!storeInstances[instance.getKey()]) {
                storeInstances[instance.getKey()] = instance;
            }
            return storeInstances[instance.getKey()];
        }
        StoreFactory.getInstance = getInstance;
    })(StoreFactory = exports.StoreFactory || (exports.StoreFactory = {}));
});
