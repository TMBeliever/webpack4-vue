const merge = require('webpack-merge')
const webpack = require('webpack')
const { build: config } = require('../config')
const commonConfig = require('./webpack.common.js')
// 用于提取css到文件中
const miniCssExtractPlugin = require('mini-css-extract-plugin');
// 用于压缩css代码
const optimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

prodConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  output: {
    filename: 'js/[name].[contenthash:8].js',
    chunkFilename: "js/[name].[contenthash:8].js",
  },
  optimization: {
    moduleIds: 'hashed',
    namedChunks: true,
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.(c|sc|sa)ss$/,
          chunks: 'all',
          enforce: true
        },
        // node_modules下的模块拆分到chunk-vendors.xxxx.js下
        vendors: {
          name: 'chunk-vendors',
          test: /[\\\/]node_modules[\\\/]/,
          priority: -10,
          chunks: 'all'
        },
        // 自己定义的公共组件超过两次引用的放在chunk-common.xxxx.js下
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'all',
          reuseExistingChunk: true
        }
      }
    }
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.s[ac]ss$/i,
  //       exclude: /node_modules/,
  //       use: [
  //         {
  //           loader: miniCssExtractPlugin.loader, // 使用miniCssExtractPlugin.loader代替style-loader
  //         },
  //         {
  //           loader: 'css-loader',
  //         },
  //         'postcss-loader',
  //         {
  //           loader: 'sass-loader',
  //           options: {
  //             implementation: require('dart-sass')
  //           }
  //         }
  //       ]
  //     },
  //   ]
  // },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.env
    }), 
    new optimizeCssnanoPlugin({
      sourceMap: true,
      cssnanoOptions: {
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
        }],
      },
    }),
    new miniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css'
    }),
    // new CompressionWebpackPlugin({
    //   filename: '[path].gz[query]',
    //   algorithm: 'gzip',
    //   test: new RegExp('\\.(js|css)$'),
    //   threshold: 10240,
    //   minRatio: 0.8
    // })
  ]
};

module.exports = merge(commonConfig, prodConfig)