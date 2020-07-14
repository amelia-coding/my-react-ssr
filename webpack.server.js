const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const RemoveAssetsPlugin = require('./plugin/remove-assets-plugin');

const config = require('./webpack.base.js');

console.log('当前server打包环境:', process.env.NODE_ENV + '...');

const serverConf = {
  target: 'node',
  entry: {
    server: './src/server/index',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|jsx?)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                // "useBuiltIns": true,
                // useBuiltIns: "usage",
                targets: {
                  node: 'current', // node支持的不转码
                },
              },
            ],
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
          plugins: [
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            ['@babel/plugin-proposal-class-properties', { loose: true }],
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
            'dynamic-import-node',
            '@loadable/babel-plugin',
          ],
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.SERVER': JSON.stringify(true),
      'process.env.CLIENT': JSON.stringify(false),
      'process.env.CLIENT_ASSET_PATH': JSON.stringify(path.resolve(__dirname, 'public')),
    }),
    new RemoveAssetsPlugin(),
  ],
  externals: [
    nodeExternals({
      //node端的第三方模块node_modules不打包，直接通过require方式获取
      whitelist: [/\.css$/], // 不设置的话，require("antd/dist/antd.css") 服务端会不识别css，忽略css，让webpack打包处理
    }),
  ],
  node: {
    __dirname: false,
  },
};

module.exports = merge(config, serverConf);
// module.exports = serverConf
