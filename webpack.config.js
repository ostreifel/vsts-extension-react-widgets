var path = require("path");
var webpack = require("webpack");
var UglifyJSPlugin = require("uglifyjs-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    target: "web",
    entry: {
        IdentityView: "./src/components/IdentityView.tsx",
        InfoLabel: "./src/components/InfoLabel.tsx",
        InputError: "./src/components/InputError.tsx",
        Loading: "./src/components/Loading.tsx",
        MessagePanel: "./src/components/MessagePanel.tsx",
        AutoResizableComponent: "./src/components/AutoResizableComponent.tsx",
        ExtensionDataManager: "./src/utilities/ExtensionDataManager.ts",
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