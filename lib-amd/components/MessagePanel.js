define(["require", "exports", "react", "OfficeFabric/Icon", "OfficeFabric/Label", "../css/MessagePanel.scss"], function (require, exports, React, Icon_1, Label_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MessageType;
    (function (MessageType) {
        MessageType[MessageType["Error"] = 0] = "Error";
        MessageType[MessageType["Warning"] = 1] = "Warning";
        MessageType[MessageType["Info"] = 2] = "Info";
        MessageType[MessageType["Success"] = 3] = "Success";
    })(MessageType = exports.MessageType || (exports.MessageType = {}));
    exports.MessagePanel = function (props) {
        var className = "message-panel";
        var iconName;
        switch (props.messageType) {
            case MessageType.Error:
                iconName = "StatusErrorFull";
                className += " message-error";
                break;
            case MessageType.Warning:
                iconName = "Warning";
                className += " message-warning";
                break;
            case MessageType.Success:
                iconName = "SkypeCircleCheck";
                className += " message-success";
                break;
            default:
                iconName = "Info";
                className += " message-info";
                break;
        }
        return (React.createElement("div", { className: className },
            React.createElement(Icon_1.Icon, { className: "icon", iconName: iconName }),
            React.createElement(Label_1.Label, { className: "message-text" }, props.message)));
    };
});
