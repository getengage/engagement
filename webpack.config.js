var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    "engage": __dirname + '/src/index.js',
    "engage.min": __dirname + '/src/index.js',
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].js"
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: 'es2015',
        },
      }
    ]
  },
  plugins: [
    // Avoid publishing files when compilation fails
    new webpack.NoErrorsPlugin(),
    // uncompressed & compressed files
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    })
  ],
  // externals: {
  //   "operative": "operative"
  // },
  stats: {
    // Nice colored output
    colors: true
  },
  // Create Sourcemaps for the bundle
  devtool: 'source-map',
};
