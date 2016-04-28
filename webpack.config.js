var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        index: path.resolve(__dirname, './src/index.js'),
        'page-loading': path.resolve(__dirname, './src/page-loading.js')
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'
    },
    alias: {},
    module: {
        loaders: [{
            test: /\.js[x]?$/,
            loader: 'babel-loader',
            exclude: /locale/,
            query: {
                presets: [
                    'es2015'
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

