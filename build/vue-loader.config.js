var ExtractTextPlugin = require('extract-text-webpack-plugin')

var loaders = {}

if (process.env.NODE_ENV !== 'production') {
    loaders = {
        css: 'vue-style-loader!css-loader',
        scss: 'vue-style-loader!css-loader!sass-loader',
        sass: 'vue-style-loader!css-loader!sass-loader'
    }
} else {
    loaders = {
        css: ExtractTextPlugin.extract({ fallback: 'vue-style-loader', use: 'css-loader' }),
        scss: ExtractTextPlugin.extract({ fallback: 'vue-style-loader', use: 'css-loader!sass-loader' }),
        sass: ExtractTextPlugin.extract({ fallback: 'vue-style-loader', use: 'css-loader!sass-loader' })
    }
}

module.exports = {
    loaders
}