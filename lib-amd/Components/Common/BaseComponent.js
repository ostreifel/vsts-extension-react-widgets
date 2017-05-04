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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "react", "OfficeFabric/Utilities", "../../Flux/FluxContext"], function (require, exports, React, Utilities_1, FluxContext_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseComponent = (function (_super) {
        __extends(BaseComponent, _super);
        function BaseComponent(props, context) {
            var _this = _super.call(this, props, context) || this;
            _this.fluxContext = FluxContext_1.FluxContext.get();
            _this.initializeState();
            return _this;
        }
        BaseComponent.prototype.componentDidMount = function () {
            var stores = this.getStoresToLoad() || [];
            for (var _i = 0, stores_1 = stores; _i < stores_1.length; _i++) {
                var store = stores_1[_i];
                store.addChangedListener(this._onStoreChanged);
            }
            this.initialize();
        };
        BaseComponent.prototype.componentWillUnmount = function () {
            var stores = this.getStoresToLoad() || [];
            for (var _i = 0, stores_2 = stores; _i < stores_2.length; _i++) {
                var store = stores_2[_i];
                store.removeChangedListener(this._onStoreChanged);
            }
        };
        BaseComponent.prototype.getStoresToLoad = function () {
            return null;
        };
        BaseComponent.prototype.initialize = function () {
        };
        BaseComponent.prototype.onStoreChanged = function () {
        };
        BaseComponent.prototype.getDefaultClassName = function () {
            return "base-component";
        };
        BaseComponent.prototype.getClassName = function () {
            if (this.props.className != null && this.props.className.trim() !== "") {
                return this.getDefaultClassName() + " " + this.props.className;
            }
            else {
                return this.getDefaultClassName();
            }
        };
        BaseComponent.prototype.initializeState = function () {
            this.state = {};
        };
        BaseComponent.prototype.updateState = function (updatedStates) {
            this.setState(__assign({}, this.state, updatedStates));
        };
        BaseComponent.prototype._onStoreChanged = function () {
            var stores = this.getStoresToLoad() || [];
            var allStoresLoaded = true;
            for (var _i = 0, stores_3 = stores; _i < stores_3.length; _i++) {
                var store = stores_3[_i];
                if (!store.isLoaded()) {
                    allStoresLoaded = false;
                    break;
                }
            }
            this.updateState({ allStoresLoaded: allStoresLoaded });
            this.onStoreChanged();
        };
        return BaseComponent;
    }(React.Component));
    __decorate([
        Utilities_1.autobind
    ], BaseComponent.prototype, "_onStoreChanged", null);
    exports.BaseComponent = BaseComponent;
});
