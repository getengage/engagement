var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    "engage": __dirname + '/src/index.js',
    "engage.min": __dirname + '/src/index.js',
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].js",
    library: 'engage',
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: [
            ['es2015', { loose: true, modules: false }]
          ]
        }
      }
    ]
  },
  plugins: [
    // uncompressed & compressed files
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true,
    })
  ],
  stats: {
    // Nice colored output
    colors: true
  },
  // Create Sourcemaps for the bundle
  devtool: 'source-map',
};
