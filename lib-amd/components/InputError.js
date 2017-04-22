define(["require", "exports", "react", "OfficeFabric/Icon", "../css/InputError.scss"], function (require, exports, React, Icon_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InputError = function (props) {
        return (React.createElement("div", { className: "input-error" },
            React.createElement(Icon_1.Icon, { className: "error-icon", iconName: "Error" }),
            React.createElement("span", null, props.error)));
    };
});
