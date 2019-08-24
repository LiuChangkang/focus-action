const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/focus-action.js',
  devServer: {
    host: "0.0.0.0"
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./demo/demo.html",
      filename: "./index.html"
    })
  ]
};
