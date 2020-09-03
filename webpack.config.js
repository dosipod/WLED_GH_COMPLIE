var path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InlineSourceWebpackPlugin = require('inline-source-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {

  // Path to your entry point. From this file Webpack will begin his work
  entry: './wled00/data/index.js',

  // Path and filename of your result bundle.
  // Webpack will bundle all JavaScript into this file
  output: {
    path: path.resolve(__dirname, 'wled00/data/dist'),
    filename: 'index.js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inlineSource: '.(js|css)$', // embed all javascript and css inline,
      template: path.resolve(__dirname, "wled00/data", "index.htm"),
      hash: false,
      minify: {
        collapseWhitespace: true,
        conservativeCollapse: true,
        preserveLineBreaks: true,
        minifyCSS: true,
        sortAttributes: true,
        sortClassName: true
      }
    }),
    new InlineSourceWebpackPlugin({
      compress: false,
      rootpath: './wled00/data/dist',
      noAssetMatch: 'warn'
    })
  ]
};
