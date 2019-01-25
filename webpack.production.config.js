module.exports = {
  entry: './assets/js/src/main.js',
  output: {
    path: `${__dirname}/assets/js/build/`,
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
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        exclude: /(node_modules|bower_components)/,
        loader: 'source-map-loader',
      },
      {
        test: /\.scss$/,
        include: /src/,
        loaders: [
          'style-loader',
          'css-loader',
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
