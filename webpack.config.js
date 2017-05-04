var path = require("path");
var webpack = require("webpack");
var UglifyJSPlugin = require("uglifyjs-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    target: "web",
    entry: {
        BaseComponent: "./src/Components/Common/BaseComponent.tsx",
        InfoLabel: "./src/Components/Common/InfoLabel.tsx",
        InputError: "./src/Components/Common/InputError.tsx",
        Loading: "./src/Components/Common/Loading.tsx",
        
        AutoResizableComponent: "./src/Components/WorkItemControls/AutoResizableComponent.tsx",
        FieldControl: "./src/Components/WorkItemControls/FieldControl.tsx",    
        IdentityView: "./src/Components/WorkItemControls/IdentityView.tsx",
        TagsView: "./src/Components/WorkItemControls/TagsView.tsx",
        
        Grid: "./src/Components/Grids/Grid.tsx",
        WorkItemGrid: "./src/Components/Grids/WorkItemGrid/WorkItemGrid.tsx",
        QueryResultGrid: "./src/Components/Grids/WorkItemGrid/QueryResultGrid.tsx",

        ExtensionDataManager: "./src/Utilities/ExtensionDataManager.ts",

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