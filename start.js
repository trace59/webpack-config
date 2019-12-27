const path = require('path');
const webpack = require('webpack');
const merge = require("webpack-merge");
const webpackDevServe = require('webpack-dev-server');
const webpackConfig = require('./webpack.config');

process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";

const port = 8015;

webpackConfig.entry.push(
  `webpack-dev-server/client?http://localhost:${port}`, // WebpackDevServer host and port
  'webpack/hot/only-dev-server',
  "react-hot-loader/patch",
  path.resolve(__dirname, "./src/entry/index.tsx")
);

const htmls = [
  new webpack.HotModuleReplacementPlugin()
];

const compiler = webpack(merge([
  webpackConfig,
  {
    mode: process.env.NODE_ENV,
    plugins: [...htmls]
  }
]));

const devServer = new webpackDevServe(compiler, {
  hot: true,
  stats: {
    entrypoints: false,
    children: false,
    color: true
  },
  // https://github.com/dgwyer/wp-react-plugin/issues/8
  disableHostCheck: true,
  historyApiFallback: true

});

devServer.listen(port, (err) => {
  if (err) {
    return console.log(err)
  } else {
    console.log("success")
  }
});