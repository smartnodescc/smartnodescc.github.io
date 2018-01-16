const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CircularDependencyPlugin = require("circular-dependency-plugin")
const path = require("path")

const BUILD_DIR = __dirname
const APP_DIR = path.resolve(__dirname, "src")
const PUBLIC_DIR = __dirname

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: `${APP_DIR}/index.html`,
    filename: "index.html",
    inject: true
})

const DefinePluginConfig = new webpack.DefinePlugin({
    API_URL: JSON.stringify(process.env.API_URL || "http://52.36.225.45/api")
})

// TODO: re-enable multi-pass compilation for enhanced performance in larger projects when https://github.com/jantimon/html-webpack-plugin/issues/533 is fixed
const HotModuleReplacementPluginConfig = new webpack.HotModuleReplacementPlugin({
    multiStep: false
})
const CircularDependencyPluginConfig = new CircularDependencyPlugin({
    // exclude detection of files based on a RegExp
    exclude: /a\.js|node_modules/,
    // add errors to webpack instead of warnings
    failOnError: true
})

// See https://medium.com/@kimberleycook/intro-to-webpack-1d035a47028d#.8zivonmtp for
// a step-by-step introduction to reading a webpack config
const config = {
    entry: `${APP_DIR}/index.js`,
    output: {
        path: BUILD_DIR,
        filename: "bundle.js",
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: APP_DIR,
                // babel loader for ES6 tranpilation and
                // react-hot for HMR of react components
                // config for babel-loader is in .babelrc
                use: ["react-hot-loader/webpack", "babel-loader"]
            },
            // The "url" loader handles all assets specified by the test regex.
            // "url" loader embeds assets smaller than specified size as data URLs to avoid requests.
            // Otherwise, it acts like the "file" loader.
            {
                test: /\.(png|jpg|woff|woff2|ttf|eot)$/,
                loader: "url-loader",
                options: {
                    limit: 10000
                }
            },
            // "file" loader for svg
            {
                test: /\.svg$/,
                loader: "file-loader",
                query: {
                    name: "static/media/[name].[hash:8].[ext]"
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    plugins: [
        DefinePluginConfig,
        HTMLWebpackPluginConfig,
        HotModuleReplacementPluginConfig,
        CircularDependencyPluginConfig
    ],
    // setting for devServer (npm run start)
    devServer: {
        contentBase: PUBLIC_DIR,

        // enable HMR
        hot: true,
        // automatic browser refresh
        inline: true,
        // automatically open in default browser
        open: true,

        // Display only errors to reduce the amount of output.
        stats: "errors-only",

        // Enable history API fallback so HTML5 History API based
        // routing works. This is a good default that will come
        // in handy in more complicated setups
        historyApiFallback: true,

        // setup proxy for routing api calls to backend server
        proxy: {
            "/api/*": "http://localhost:3000"
        },
        // port to run the dev server on
        port: 8080
    }
}

module.exports = config
