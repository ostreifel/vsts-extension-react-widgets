define(["require", "exports", "react", "OfficeFabric/Label", "VSS/Utils/String", "../../css/IdentityView.scss"], function (require, exports, React, Label_1, Utils_String) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var IdentitySize;
    (function (IdentitySize) {
        IdentitySize[IdentitySize["Small"] = 0] = "Small";
        IdentitySize[IdentitySize["Medium"] = 1] = "Medium";
        IdentitySize[IdentitySize["Large"] = 2] = "Large";
    })(IdentitySize = exports.IdentitySize || (exports.IdentitySize = {}));
    exports.IdentityView = function (props) {
        var displayName = "";
        var imageUrl = "";
        var identityRef = parseUniquefiedIdentityName(props.identityDistinctName);
        displayName = identityRef.displayName;
        imageUrl = identityRef.imageUrl;
        if (!displayName) {
            return null;
        }
        else {
            var sizeClassName = "small";
            if (props.size && props.size === IdentitySize.Medium) {
                sizeClassName = "medium";
            }
            else if (props.size && props.size === IdentitySize.Large) {
                sizeClassName = "large";
            }
            return (React.createElement(Label_1.Label, { className: "identity-view " + sizeClassName + " " + (props.className || "") },
                imageUrl !== "" && (React.createElement("img", { src: imageUrl })),
                React.createElement("span", { className: "display-name" }, displayName)));
        }
    };
    function parseUniquefiedIdentityName(name) {
        if (!name) {
            return {
                displayName: "",
                uniqueName: "",
                imageUrl: ""
            };
        }
        var i = name.lastIndexOf("<");
        var j = name.lastIndexOf(">");
        var displayName = name;
        var alias = "";
        var rightPart = "";
        var id = "";
        if (i >= 0 && j > i && j === name.length - 1) {
            displayName = name.substr(0, i).trim();
            rightPart = name.substr(i + 1, j - i - 1).trim();
            var vsIdFromAlias = getVsIdFromGroupUniqueName(rightPart);
            if (rightPart.indexOf("@") !== -1 || rightPart.indexOf("\\") !== -1 || vsIdFromAlias || Utils_String.isGuid(rightPart)) {
                alias = rightPart;
                if (vsIdFromAlias != "") {
                    id = vsIdFromAlias;
                    alias = "";
                }
            }
            else {
                displayName = name;
            }
        }
        var imageUrl = "";
        if (id) {
            imageUrl = VSS.getWebContext().host.uri + "/_api/_common/IdentityImage?id=" + id;
        }
        else if (alias) {
            imageUrl = VSS.getWebContext().host.uri + "/_api/_common/IdentityImage?identifier=" + alias + "&identifierType=0";
        }
        return {
            displayName: displayName,
            uniqueName: alias,
            imageUrl: imageUrl
        };
    }
    function getVsIdFromGroupUniqueName(str) {
        var leftPart;
        if (!str) {
            return "";
        }
        var vsid = "";
        var i = str.lastIndexOf("\\");
        if (i === -1) {
            leftPart = str;
        }
        else {
            leftPart = str.substr(0, i);
        }
        if (Utils_String.startsWith(leftPart, "id:")) {
            var rightPart = leftPart.substr(3).trim();
            vsid = Utils_String.isGuid(rightPart) ? rightPart : "";
        }
        return vsid;
    }
});
