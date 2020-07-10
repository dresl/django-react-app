var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

module.exports = {
    context: __dirname,
    entry: './chat/frontend/js/index.js',
    output: {
        path: path.resolve('./assets/assets'),
        filename: "[name]-[hash].js"
    },    
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
        ]
    },
    plugins: [
        new BundleTracker({filename: './webpack-bundle.json'})
    ],
    devtool: 'sourceMap'
}
