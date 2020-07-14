const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');

const config = require('./webpack.base');

console.log('当前client打包环境:', process.env.NODE_ENV + '...');

const clientConf = {
  entry: {
    client: './src/client/index',
  },
  output: {
    path: path.resolve('public'),
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          {
            loader: 'css-loader',
            options: {
              modules: false,
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(tsx?|jsx?)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          comments: true,
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  browsers: ['>0.25%', 'not ie 11', 'not op_mini all'],
                },
              },
            ],
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
          plugins: [
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            ['@babel/plugin-proposal-class-properties', { loose: true }],
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-transform-async-to-generator',
            [
              '@babel/plugin-transform-runtime',
              // {
              //   corejs: 3,
              //   helpers: true,
              //   regenerator: true,
              //   useESModules: true,
              // },
            ],
            [
              'import',
              {
                libraryName: 'antd',
                libraryDirectory: 'es',
                style: 'css',
              },
            ],
            '@loadable/babel-plugin',
          ],
        },
      },
    ],
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: 'index.html'
    // }),
    new webpack.DefinePlugin({
      'process.env.CLIENT': JSON.stringify(true),
      'process.env.SERVER': JSON.stringify(false),
    }),
    new LoadablePlugin({
      filename: 'client-bundle.json',
    }),
  ],
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all',
      name: true,
      minSize: 3000,
      minChunks: 1,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 10,
        },
      },
    },
  },
};

module.exports = merge(config, clientConf);
