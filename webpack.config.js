'use strict'

const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = () => {
  return {
    devtool: 'source-map',
    entry: './index.ts',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'easyDownload.min.js',
      sourceMapFilename: 'easyDownload.map',
      library: 'easyDownload',
      libraryTarget: 'umd',
      umdNamedDefine: true
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.ts$/,
          use: [
            {
              loader: 'tslint-loader',
              options: {
                typeCheck: true,
                fix: true,
              },
            },
          ],
        },
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          loader: "ts-loader"
        },
      ]
    },
    resolve: {
      extensions: ['.js', '.ts', '.json'],
      modules: ['node_modules'],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new webpack.ProvidePlugin({
        Promise: 'es6-promise',
      }),
    ],
  }
}
