const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const config = require('../config')
const baseWebpackConfig = require('./webpack.base.config')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function(name) {
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
    // eval-source-map is faster for development
    devtool: '#cheap-module-eval-source-map',
    module: {
        rules: [{
            test: /\.css$/,
            loader: 'style-loader!css-loader!postcss-loader'
        }, {
            test: /\.s[a|c]ss$/,
            loader: 'style-loader!css-loader!sass-loader?includePaths[]=' + path.join(__dirname, "../node_modules/compass-mixins/lib")
        }]
    },
    plugins: [
        new webpack.DefinePlugin({ 'process.env': config.dev.env }),
        new FriendlyErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            names: ["vendor"]
        }),
        new HtmlWebpackPlugin({
            chunks: ['vendor', 'app'],
            filename: 'index.html',
            template: 'src/template/index.html',
            favicon: 'favicon.ico',
            inject: true
        }),
        new HtmlWebpackPlugin({
            chunks: ['vendor', 'admin'],
            filename: 'admin.html',
            template: 'src/template/admin.html',
            favicon: 'favicon.ico',
            inject: true
        })
    ]
})