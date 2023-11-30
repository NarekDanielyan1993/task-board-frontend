/* eslint-disable no-underscore-dangle */
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import WebpackBar from 'webpackbar';

const __filename = fileURLToPath(import.meta.url);

export const __dirname = dirname(__filename);

console.log('Current directory:', __dirname);

export default {
    entry: path.resolve(__dirname, 'src/pages/index.tsx'),
    target: ['web', 'es6'],
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.svg', '.css'],
        alias: {
            src: path.resolve(__dirname, 'src/'),
            public: path.resolve(__dirname, 'public'),
        },
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
    module: {
        rules: [
            {
                test: /\.(js|ts|(js|ts)x)?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                        },
                    },
                ],
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    // MiniCssExtractPlugin.loader,
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    // Enable when the sass package is installed
                    // 'sass-loader'
                ],
            },
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                use: ['@svgr/webpack'],
            },
            {
                // Webpack 5 supports image loaders out of the box
                test: /\.(ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|)$/,
                type: 'asset/inline',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].js',
        }),
        new WebpackBar(),
    ],
};
