const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const FirendlyErrorePlugin = require('friendly-errors-webpack-plugin');

module.exports = {
  mode: "production",
  entry: {
    vendor: ['react', 'react-router', 'react-router-dom']
  },
  output: {
    path: path.resolve(__dirname, 'dist/_base'),
    filename: '[name].dll.js',
    library: '[name]_dll_lib'
  },
  plugins: [
    new CleanWebpackPlugin({
      path: path.join(__dirname, 'dist/_base/*')
    }),
    new webpack.DllPlugin({
      name: '[name]_dll_lib',
      context: __dirname,
      path: path.join(__dirname, 'dist', '_base', '[name].manifest.json'),
    }),
    new FirendlyErrorePlugin()
  ],
  performance: {
    hints: "warning", // 开发环境设置较大防止警告
    // 根据入口起点的最大体积，控制webpack何时生成性能提示,整数类型,以字节为单位
    maxEntrypointSize: 5000000, // 最大单个资源体积，默认250000 (bytes)
    maxAssetSize: 3000000
  }
}