const path = require('path');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    entry: { // entry point for webpack to start
        popup: path.resolve('src/popup/popup.tsx'),
        options: path.resolve('src/options/options.tsx'),
        background: path.resolve('src/background/background.ts'),
        contentScript: path.resolve('src/contentScripts/contentScript.ts'),
        overlayScript: path.resolve('src/contentScripts/overlayScript.tsx')
    },
    module: {
        rules: [
            {
                use: 'ts-loader', // processing ts/tsx files
                test: /\.tsx?$/,
                exclude: /node_modules/
            },
            {
                use: ['style-loader', 'css-loader'], // processing css files
                test: /\.css$/i,
            },
            {
                type: 'asset/resource', //static assets
                test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'] // extensions to be resolved
    },
    plugins: [
        new CleanWebpackPlugin({ // clean the distribution folder for dev/prod builds
           cleanStaleWebpackAssets: false
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve('src/static'),
                    to: path.resolve('dist')
                }
            ]
        }),
        ...getHtmlPlugins([
            'popup',
            'options'
        ])
    ],
    output: {
        filename: "[name].js",
        path: path.resolve('dist')
    },
    optimization: {
        splitChunks: {
            chunks(chunk) {
                return chunk.name !== 'overlayScript'
            }
        }
    }
}

function getHtmlPlugins(chucks) {
    return chucks.map((chunk) => new HtmlWebpackPlugin({
        title: 'React Boilerplate',
        filename: `${chunk}.html`,
        chunks: [chunk],
        template: './src/static/template.html'
    }))
}