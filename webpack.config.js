var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var path = require('path');
var dist = path.join(__dirname, 'docs');
var app = path.resolve(__dirname);
var bs = path.join(__dirname, 'node_modules/bootstrap');

var production = process.env.BUILD === 'production';

var config = {
  entry: './app.js',
  mode: process.env.BUILD,
  output: {
    path: dist,
    filename: "graphviz-viewer.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        // Reference: https://github.com/babel/babel-loader
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
            // https://github.com/babel/babel-loader#options
            cacheDirectory: true,
            presets: ['@babel/preset-env'],
        },
        exclude: /node_modules/,
        include: [app]
      },

      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|txt|ico)$/,
        loader: 'file-loader',
        include: [bs]
      }
    ]
  },
  node: {
    fs: 'empty'
  },
  devServer: {
    inline: false,
    contentBase: dist
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'head',
      baseUrl: '/'
    }),
    new CopyWebpackPlugin([
        { from: 'examples/biological.gv' }
    ])
  ]
};

module.exports = config;
