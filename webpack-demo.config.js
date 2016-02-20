/* jshint node: true, loopfunc: true, undef: true, unused: true */
///* global */

var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        'features': path.resolve(__dirname, './demo/features.es6.js')
    },
    output: {
        path: path.resolve(__dirname, './demo'),
        filename: '[name].js'
    },
    alias: {},
    module: {
        loaders: [{
            test: /\.js[x]?$/,
            loader: 'babel-loader',
            exclude: /node_modules|locale/,
            query: {
                presets: [
                    'es2015'
                ],
                plugins: [
                    'syntax-export-extensions',
                    'transform-export-extensions'
                ]
            }
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader'),
        }, {
            test: /\.woff(2)?(\?.+)?$/,
            loader: 'url-loader?limit=10000&minetype=application/font-woff'
        }, {
            test: /\.(ttf|eot|svg)(\?.+)?$/,
            loader: 'file-loader'
        }]
    },
    plugins: [
        new ExtractTextPlugin('[name].css')
    ],
    devtool: 'source-map'
};

