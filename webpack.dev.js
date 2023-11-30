/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */
import DotenvWebpackPlugin from 'dotenv-webpack';
// import { ErrorOverlayPlugin } from 'error-overlay-webpack-plugin';
import path from 'path';
import { merge } from 'webpack-merge';
import common, { __dirname } from './webpack.config.js';

export default merge(common, {
    mode: 'development',
    output: {
        filename: '[name].js',
        publicPath: '/',
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'public'),
        },
        hot: true,
        historyApiFallback: true,
        compress: true,
        port: 9000,
    },
    optimization: {
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
        runtimeChunk: true,
    },
    devtool: 'cheap-module-source-map',
    plugins: [
        new DotenvWebpackPlugin({
            path: path.resolve('.env.development'),
        }),
        // new ErrorOverlayPlugin(),
    ],
});
