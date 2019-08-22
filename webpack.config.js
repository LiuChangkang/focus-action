const path = require("path");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/focus-action.js',
  output: {
    path: path.resolve(__dirname, "./src"),
    filename: "./focus-action.min.js"
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin()
    ],
  }
};
