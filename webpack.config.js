/* eslint-disable no-useless-escape,no-dupe-keys */
var path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        ts: path.join(__dirname, 'src/test.ts')
    },
    devtool: '#source-map',
    devServer: {
        inline: true
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'awesome-typescript-loader'
                }
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {}
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack',
            filename: 'index.html',
            template: './src/index.html',
            favicon: '',
            hash: false
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['manifest']
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'publish'),
        chunkFilename: 'chunk/[name].[chunkhash].js'
    }
}
