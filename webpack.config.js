var path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var jsName = 'bundle.js';

var BUILD_DIR = path.resolve(__dirname, 'ui/assets');

var config = {
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, './ui/src/client.jsx')
  ],
  output: {
      path: BUILD_DIR,
      filename: jsName
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
      // {
      //   test: /\.css$/,
      //    loader: ExtractTextPlugin.extract({
      //         loader: 'css-loader',
      //         query: {
      //           localIdentName: '[name]__[local]___[hash:base64:5]',
      //           modules: true
      //         }
      //       })
      // },
      { test: /\.(woff|woff2|ttt|eot|otf)/, loader: 'url-loader?limit=1' },
      {
        test: /\.png/,
        //loader: 'url-loader?limit=10000&mimetype=image/png',
        loader: 'file-loader',
        query: {
          name: 'images/[hash].[ext]',
          publicPath: '/'
        }
      },
      { test: /\.svg/, loader: 'url-loader?limit=26000&mimetype=svg+xml' }
    ]
  },
  devServer: {
      headers: { 'Access-Control-Origin': '*'}
  },
  devtool: 'source-map',
  plugins: [
    new ExtractTextPlugin({
      filename: 'styles.css',
      allChunks: true
    })
  ]

};

module.exports = config;
