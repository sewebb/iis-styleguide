require('dotenv').config();
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const host = require('./getNetworkHost');

module.exports = {
    entry: {
        'script': ['./src/app.js'],
        'style': './src/app.scss',
        'print': './src/print.scss',
    },

    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'public/assets'),
        publicPath: '',
        libraryTarget: 'umd'
    },

    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules(?!\/webpack-dev-server)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract(
                    {
                        use: [
                            'css-loader',
                            { loader: 'postcss-loader', options: { sourceMap: true }},
                            'resolve-url-loader',
                            { loader: 'sass-loader', options: { sourceMap: true } },
                            'import-glob-loader'
                        ]
                    }
                )
            },
            {
                test: /\.(png|gif|svg|jpg|woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    },

    devtool: 'eval-source-map',

    devServer: {
        host: host,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    },

    resolve: {
        extensions: ['.js'],
        alias: {
            'react': 'preact-compat',
            'react-dom': 'preact-compat'
        }
    },

    plugins: [
        new ExtractTextPlugin('[name].css', { allChunks: true }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        })
    ]
};
