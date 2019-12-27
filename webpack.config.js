const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin");

const imageInlineSizeLimit = parseInt(
  process.env.IMAGE_INLINE_SIZE_LIMIT || "10000"
);

module.exports = {
  entry: [],
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "_[name][hash:8].js",
    publicPath: "/"
  },
  module: {
    rules: [{
      test: /\.(png|jpg|jpeg|gif)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: imageInlineSizeLimit
        }
      }]
    }, {
      test: /\.(mjs|jsx?|tsx?)$/,
      exclude: /(node_modules|bower_components)/,
      use: [{
        loader: 'cache-loader'
      }, {
        loader: 'babel-loader'
      }]
    }, {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        "css-loader"
      ]
    }, {
      test: /\.less$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {
          // only enable hot in development
          hmr: process.env.NODE_ENV === 'development',
          // // if hmr does not work, this is a forceful method.
          reloadAll: true,
        }
      }, {
        loader: "css-loader",
        options: {
          modules: false
        }
      }, {
        loader: "less-loader",
        options: {
          strictMath: true,
          noIeCompat: true,
          javascriptEnabled: true
        }
      }]
    }]
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      "web-base": path.resolve(__dirname, "./web-base/"),
      'react-dom': '@hot-loader/react-dom'
    },
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
    "react-router": "ReactRouter",
    "react-router-dom": "ReactRouterDOM",
  },
  plugins: [
    new ProgressBarPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, "./public/index.html")
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
      ignoreOrder: true // Enable to remove warnings about conflicting order
    }),
    new FilterWarningsPlugin({
      exclude: /mini-css-extract-plugin[^]*Conflicting order between:/
      // https://github.com/webpack-contrib/mini-css-extract-plugin/issues/250#issuecomment-421989979
    }),
    // 该插件将把给定的 JS 或 CSS 文件添加到 webpack 配置的文件中，并将其放入资源列表 html webpack插件注入到生成的 html 中。
    // new AddAssetHtmlWebpackPlugin({
    //   filepath: path.join(__dirname, './dist/_base/vendor.dll.js')
    // }),
    // // 告诉 Webpack 使用了哪些动态链接库
    // new webpack.DllReferencePlugin({
    //   context: __dirname,
    //   manifest: require("./dist/_base/vendor.manifest.json")
    // })
  ],
  // Turn off performance processing because we utilize
  // our own hints via the FileSizeReporter
  performance: false,
}