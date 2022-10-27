const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const ZipPlugin = require("zip-webpack-plugin");
const path = require("path");

module.exports = merge(common, {
    mode: "production",
    plugins: [
        new ZipPlugin({
            filename: "price_averager.zip",
            path: path.resolve('build')
        }),
    ]
})