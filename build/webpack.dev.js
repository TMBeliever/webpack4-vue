const path = require('path');
const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const { dev: config } = require('../config')

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: config.port,
    open: config.autoOpenBrowser,
    hot: true,
    quiet: true,
    historyApiFallback: true,
    // hotOnly: true
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.s[ac]ss$/i,
  //       exclude: /node_modules/,
  //       use: [
  //         'style-loader',
  //         {
  //           loader: 'css-loader',
  //         },
  //         'postcss-loader',
  //         {
  //           loader: 'sass-loader',
  //           options: {
  //             implementation: require('dart-sass')
  //           }
  //         },
  //       ]
  //     },
  //   ]
  // },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.env
    }), 
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://127.0.0.1:${config.port}`],
      },
      // onErrors: config.dev.notifyOnErrors
      //   ? utils.createNotifierCallback()
      //   : undefined,
      clearConsole: true,
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};

module.exports = merge(commonConfig, devConfig)