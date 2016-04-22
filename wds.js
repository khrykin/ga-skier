var config = require("./webpack.config.js");
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var exec = require('child_process').exec;

config.entry.unshift("webpack-dev-server/client?http://localhost:8080/");

var compiler = webpack(config);
var app = new WebpackDevServer(compiler, {
  historyApiFallback: true,
  publicPath: `/`,
  // hot: 'true',
  lazy: false,
  stats: { colors: true }
});

app.listen(8080, () => {
  console.log('WebpackDevServer is now running on http://localhost:8080/');
  exec('open http://localhost:8080/');
});
