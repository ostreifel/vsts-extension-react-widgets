var path = require("path");
var webpack = require("webpack");
var UglifyJSPlugin = require("uglifyjs-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    target: "web",
    entry: {
        IdentityView: "./src/Components/Common/IdentityView.tsx",
        InfoLabel: "./src/Components/Common/InfoLabel.tsx",
        InputError: "./src/Components/Common/InputError.tsx",
        Loading: "./src/Components/Common/Loading.tsx",
        Chip: "./src/Components/Common/Chip.tsx",
        AutoResizableComponent: "./src/Components/WorkItemFormControls/AutoResizableComponent.tsx",
        FieldControl: "./src/Components/WorkItemFormControls/FieldControl.tsx",
        ExtensionDataManager: "./src/Utilities/ExtensionDataManager.ts",
        WorkItemGrid: "./src/Components/WorkItemGrid/WorkItemGrid",
        QueryResultGrid: "./src/Components/WorkItemGrid/QueryResultGrid",
        "vsts-extension-react-widgets.min": "./src/index.ts"
    },
    output: {
        filename: "[name].js",
        libraryTarget: "amd"
    },
    externals: [
        {
            "q": true,
            "react": true,
            "react-dom": true
        },
        /^VSS\/.*/, /^TFS\/.*/, /^q$/
    ],
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
        moduleExtensions: ["-loader"],
        alias: { 
            "OfficeFabric": path.resolve(__dirname, "node_modules/office-ui-fabric-react/lib-amd")
        }
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            {
                test: /\.s?css$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    plugins: [
        new UglifyJSPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        }),
        new CopyWebpackPlugin([
            { from: "./src/css", to: "../lib-amd/css" }
        ])
    ]
}