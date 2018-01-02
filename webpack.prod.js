const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

var jsName = 'bundle.js';
var BUILD_DIR = path.resolve(__dirname, 'ui/assets');

var config = {
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, './ui/src/client.jsx')
  ],
  output: {
      path: BUILD_DIR,
      filename: 'bundle.js'
  },
  resolve: {
      extensions: ['.js', '.jsx', '.css']
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      { test: /\.flow$/, loader: 'ignore-loader' },
    ]
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
       'process.env.NODE_ENV': JSON.stringify('production')
     }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new UglifyJSPlugin({
        sourceMap: true, // this will enable debug in production
        uglifyOptions: {
          output: {
            comments: false
          },
          mangle: false
        }
      }),
    new ExtractTextPlugin({
      filename: 'styles.css',
      allChunks: true
    })
  ]
}

module.exports = config;
