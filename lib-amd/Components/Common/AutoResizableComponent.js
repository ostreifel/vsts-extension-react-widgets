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
define(["require", "exports", "react", "VSS/Utils/Core"], function (require, exports, React, Utils_Core) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AutoResizableComponent = (function (_super) {
        __extends(AutoResizableComponent, _super);
        function AutoResizableComponent(props, context) {
            var _this = _super.call(this, props, context) || this;
            _this._minWindowWidthDelta = 10;
            _this._windowResizeThrottleDelegate = Utils_Core.throttledDelegate(_this, 50, function () {
                _this._windowWidth = window.innerWidth;
                _this.resize();
            });
            _this._windowWidth = window.innerWidth;
            $(window).resize(function () {
                if (Math.abs(_this._windowWidth - window.innerWidth) > _this._minWindowWidthDelta) {
                    _this._windowResizeThrottleDelegate.call(_this);
                }
            });
            return _this;
        }
        AutoResizableComponent.prototype.render = function () {
            return null;
        };
        AutoResizableComponent.prototype.componentDidMount = function () {
            this.resize();
        };
        AutoResizableComponent.prototype.componentDidUpdate = function () {
            this.resize();
        };
        AutoResizableComponent.prototype.resize = function (delay) {
            var f = function () {
                var bodyElement = document.getElementsByTagName("body").item(0);
                VSS.resize(null, bodyElement.offsetHeight);
            };
            var throttle = Utils_Core.throttledDelegate(this, delay, f);
            if (delay) {
                throttle();
            }
            else {
                f();
            }
        };
        return AutoResizableComponent;
    }(React.Component));
    exports.AutoResizableComponent = AutoResizableComponent;
});
