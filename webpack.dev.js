const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: "development", // mode of development
    devtool: 'cheap-module-source-map',
})