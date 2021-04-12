const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  mode: "development",
  devServer: {
      contentBase: "./dist",
  },
  devtool: "inline-source-map",
  plugins: [
      new HtmlWebpackPlugin({
          title: "BattleShip",
          template: "/src/index.html",
          favicon: "./src/favicon.ico",
      })
  ],
  module: {
      rules: [
          {
              test: /\.css$/i,
              use: ['style-loader', 'css-loader'],
          }
      ]
  }
};