const path = require('path');

function getEntrySources(sources) {
  if (process.env.NODE_ENV !== 'production') {
    sources.push('webpack-dev-server/client?http://localhost:8080');
    sources.push('webpack/hot/only-dev-server');
  }

  return sources;
}

module.exports = {
  mode: 'development',
  entry: getEntrySources(['./assets/js/src/demo.js']),
  output: {
    publicPath: 'http://localhost:8080/',
    path: path.join(__dirname, 'assets/js/build/'),
    filename: 'assets/js/build/demo.js',
  },
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'source-map-loader',
      },
      {
        test: /\.scss$/,
        include: /src/,
        loaders: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader?outputStyle=expanded',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'url-loader?limit=8192',
          'img-loader',
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: [
          'babel-loader?presets[]=stage-0,presets[]=react,presets[]=es2015',
        ],
      },
    ],
  },
};
