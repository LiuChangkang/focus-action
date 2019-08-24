const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/focus-action.js',
    output: {
    filename: "./focus-action.min.js"
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin()
    ],
  }
};
