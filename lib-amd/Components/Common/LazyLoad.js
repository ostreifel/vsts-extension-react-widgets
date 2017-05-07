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
define(["require", "exports", "react", "./Loading"], function (require, exports, React, Loading_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LazyLoad = (function (_super) {
        __extends(LazyLoad, _super);
        function LazyLoad(props, context) {
            var _this = _super.call(this, props, context) || this;
            _this._isMounted = false;
            _this.state = {
                isLoaded: false,
                fetchedModule: null
            };
            return _this;
        }
        LazyLoad.prototype.componentDidMount = function () {
            this._isMounted = true;
            this._load(this.props.module);
        };
        LazyLoad.prototype.componentWillReceiveProps = function (nextProps) {
            if (this.props.module !== nextProps.module) {
                this._load(nextProps.module);
            }
        };
        LazyLoad.prototype.componentWillUnmount = function () {
            this._isMounted = false;
        };
        LazyLoad.prototype._load = function (moduleName) {
            var _this = this;
            this.setState({
                isLoaded: false
            });
            requirejs([moduleName], function (result) {
                if (_this._isMounted) {
                    _this.setState({ fetchedModule: result, isLoaded: true });
                }
            });
        };
        LazyLoad.prototype.render = function () {
            if (!this.state.isLoaded) {
                return React.createElement(Loading_1.Loading, null);
            }
            return React.Children.only(this.props.children(this.state.fetchedModule));
        };
        return LazyLoad;
    }(React.Component));
    exports.LazyLoad = LazyLoad;
});
