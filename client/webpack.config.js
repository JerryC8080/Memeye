/*
 * @Author: JerryC (huangjerryc@gmail.com)
 * @Date: 2016-10-24 15:01:25
 * @Last Modified by: JerryC
 * @Last Modified time: 2016-10-24 16:32:44
 * @Description
 */
const path = require('path');

module.exports = {
    entry: "./js/index.js",
    output: {
        path: path.join(__dirname, './dist/'),
        filename: "bundle.js"
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
    }
};