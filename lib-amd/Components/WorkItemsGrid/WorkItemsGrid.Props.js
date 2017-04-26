define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ColumnPosition;
    (function (ColumnPosition) {
        ColumnPosition[ColumnPosition["FarLeft"] = 0] = "FarLeft";
        ColumnPosition[ColumnPosition["FarRight"] = 1] = "FarRight";
    })(ColumnPosition = exports.ColumnPosition || (exports.ColumnPosition = {}));
    var SortOrder;
    (function (SortOrder) {
        SortOrder[SortOrder["ASC"] = 0] = "ASC";
        SortOrder[SortOrder["DESC"] = 1] = "DESC";
    })(SortOrder = exports.SortOrder || (exports.SortOrder = {}));
    var ColumnType;
    (function (ColumnType) {
        ColumnType[ColumnType["Field"] = 0] = "Field";
        ColumnType[ColumnType["Custom"] = 1] = "Custom";
    })(ColumnType = exports.ColumnType || (exports.ColumnType = {}));
});
