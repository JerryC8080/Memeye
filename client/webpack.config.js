/*
 * @Author: JerryC (huangjerryc@gmail.com)
 * @Date: 2016-10-24 15:01:25
 * @Last Modified by: JerryC
 * @Last Modified time: 2016-10-26 11:36:42
 * @Description
 */

const _ = require('lodash');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ENV = process.env.NODE_ENV || 'development';

let config = {
    entry: "./js/index.js",
    output: {
        path: ('./dist/'),
        filename: "index.bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015', "stage-0"]
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Memeye Dashboard',
            template: './index.html',
            hash: true,
            minify: {
                removeAttributeQuotes: true,
                minifyJS: true,
            },
        }),
    ]
}

if (ENV === 'production') {
    _.merge(config, {
        plugins: [
            new webpack.optimize.UglifyJsPlugin({ minimize: true })
        ]
    })
}

module.exports = config;