const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/client/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: './src/client/index.js',
  output: {
    path: path.resolve('dist/client'),
    filename: 'index_bundle.js'
  },
  module: {
    rules: [
      { test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: 'css-loader'
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }, {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },
  plugins: [HtmlWebpackPluginConfig],
  mode: 'development',
  watchOptions: {
    ignored: /node_modules/
  },
  devServer: {
    port: '3000',
  },
}
