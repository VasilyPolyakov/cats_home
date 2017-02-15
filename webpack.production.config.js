const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    context: __dirname + '/app',
    entry: {
        app: "./main.js",
    },
    output: {
        path: __dirname + "/public/js",
        filename: "[name].js",
        publicPath: '/js/'
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new CleanWebpackPlugin(['public'], {
            root: __dirname,
            verbose: true,
            dry: false,
            exclude: ['index.html', 'api']
        }),
        new CopyWebpackPlugin([
            {from: 'assets/images/cats', to: __dirname + "/public/js/assets/images/cats"}
        ]),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.html$/,
                loader: "underscore-template-loader",
                query: {
                    attributes: ['img:src']
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },

            {
                test: /\.(ttf|eot|svg|png|jpg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader?name=[path][name].[ext]"
            },
        ]
    }
};