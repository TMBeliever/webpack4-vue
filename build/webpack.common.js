const path = require('path');
const webpack = require('webpack')
const utils = require('./utils')
const config = require('../config')
const htmlWebpackPlugin = require('html-webpack-plugin')
// 用于提取css到文件中
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// 拷贝静态资源
const copyWebpackPlugin = require('copy-webpack-plugin');

function resolve (dir) {
  return path.join(__dirname, '../', dir);
}
function resolveResource(name) {
  return path.resolve(__dirname, '../src/common/css/' + name);
}

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'js/[name].[contenthash:8].js',
    chunkFilename: "js/[name].[contenthash:8].js",
    path: path.resolve(__dirname, '../dist'),
    publicPath: config.build.assetsPublicPath
  },
  resolve: {
    extensions: ['*', '.js', '.vue'],
    alias: {
      '@': resolve('src'),
      'vue$': 'vue/dist/vue.runtime.esm.js'
    },
    modules: [resolve('node_modules')]
  },
  module: {
    rules: [
      {
        test: /\.(vue|js)$/,
        use: {
          loader: 'eslint-loader',
          options: {
            formatter: require('eslint-friendly-formatter')
          }
        },
        enforce: 'pre',
        include: [resolve('src')],
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              }
            }
          }
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            esModule: false,
            name: '[name]_[hash].[ext]',
            limit: 204800,
            outputPath: 'images/'
          },
        }
      },
      {
        test: /\.(eot|ttf|woff|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'font/'
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          process.env.NODE_ENV === 'production'
            ? { loader: miniCssExtractPlugin.loader }
            : 'style-loader',
          {
            loader: 'css-loader',
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('dart-sass')
            }
          },
          {
            loader: 'sass-resources-loader',
            options: {
              // 多个文件时用数组的形式传入，单个文件时可以直接使用 path.resolve(__dirname, '../static/style/common.scss'
              resources: [resolveResource('var.scss')]
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      // 指定模板
      template: resolve('public/index.html'),
      // 输出的文件
      filename: resolve('dist/index.html')
    }),
    new VueLoaderPlugin(),
    new copyWebpackPlugin([{
      from: resolve('public'),
      to: resolve('dist')
    }]),
    new CleanWebpackPlugin(),
  ]
};