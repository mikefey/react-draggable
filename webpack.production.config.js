const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, '/assets/js/src/main.js'),
  output: {
    path: path.join(__dirname, 'assets/js/lib/'),
    filename: 'react-draggable.build.js',
    libraryTarget: 'umd',
    library: 'ReactDraggable',
  },
  externals: [{
    react: 'react',
    'react-dom': 'react-dom',
    'prop-types': 'prop-types',
  }],
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: [
          'babel-loader?presets[]=stage-0,presets[]=react,presets[]=es2015',
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin(),
    ],
  },
};
