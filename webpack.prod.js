/* eslint-disable import/extensions */
import StatoscopeWebpackPlugin from '@statoscope/webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import DotenvWebpackPlugin from 'dotenv-webpack';
import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import { merge } from 'webpack-merge';
import common, { __dirname } from './webpack.config.js';

const StatosCopePlugin = StatoscopeWebpackPlugin.default;

export default merge(common, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'build'),
        pathinfo: false,
        filename: '[name].[contenthash].js',
        publicPath: '/',
    },
    optimization: {
        runtimeChunk: 'single',
        minimize: true,
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                },
            },
        },
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    ecma: 2020,
                    compress: true,
                },
                minify: TerserPlugin.esbuildMinify,
            }),
            new CssMinimizerPlugin(),
        ],
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false,
        }),
        new CopyWebpackPlugin({
            patterns: [{ from: './public', to: './public' }],
        }),
        new DotenvWebpackPlugin({
            path: path.resolve('.env.production'),
        }),
        new StatosCopePlugin({
            saveReportTo: './statsReports/report-[name]-[hash].html',
        }),
        new TerserPlugin(),
    ],
    devtool: false,
});
