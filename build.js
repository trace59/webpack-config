const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const {
  CleanWebpackPlugin
} = require("clean-webpack-plugin");
const webpackConfig = require("./webpack.config");

process.env.NODE_ENV = "production";


webpackConfig.entry.push(path.resolve(__dirname, './src/entry/index.tsx'));

const htmls = [
  new CleanWebpackPlugin({
    cleanOnceBeforeBuildPatterns: ["!_base/*"]
  })
];


const compiler = webpack(merge([
  webpackConfig,
  {
    mode: process.env.NODE_ENV,
    plugins: [...htmls]
  }
]));

compiler.run((err, stats) => {

  if (err || stats.hasErrors()) {
    console.error(err)
  } else {
    console.log("webpack success")
  }

  console.log(stats.toString({
    chunks: false, // 使构建过程更静默无输出
    colors: true, // 在控制台展示颜色
    entrypoints: false, // 禁止输出构建统计信息
    children: false
  }))
})