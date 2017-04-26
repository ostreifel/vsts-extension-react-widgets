define(["require", "exports", "react", "OfficeFabric/Label", "OfficeFabric/Icon", "../../css/InfoLabel.scss"], function (require, exports, React, Label_1, Icon_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InfoLabel = function (props) {
        return (React.createElement("div", { className: "info-label" },
            React.createElement(Label_1.Label, { className: "info-label-text" }, props.label),
            React.createElement("div", { className: "info-icon-container" },
                React.createElement("span", { className: "rich-tooltipped rich-tooltipped-se", "aria-label": props.info },
                    React.createElement(Icon_1.Icon, { className: "info-icon", iconName: "Info" })))));
    };
});
