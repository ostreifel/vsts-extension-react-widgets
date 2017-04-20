var path = require("path");
var webpack = require("webpack");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
    target: "web",
    entry: {
        IdentityView: "./src/IdentityView.tsx",
        InfoLabel: "./src/InfoLabel.tsx",
        InputError: "./src/InputError.tsx",
        Loading: "./src/Loading.tsx",
        MessagePanel: "./src/MessagePanel.tsx",
        AutoResizableComponent: "./src/AutoResizableComponent.tsx",
        ExtensionDataManager: "./src/ExtensionDataManager.ts",
        index: "./src/index.ts"
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
                loader: "awesome-typescript-loader"
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
        })
    ]
}