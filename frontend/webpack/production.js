const config = require('./config.js');
const webpack = require('webpack');

module.exports = Object.assign(config, {
  entry: [
    './index.js'
  ],
  plugins: config.plugins.concat([
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin()
  ]),
  devtool: 'eval'
});

/*
 * Maybe add in the future:
 * - https://github.com/lettertwo/appcache-webpack-plugin
 * - https://github.com/NekR/offline-plugin
 * - https://github.com/goldhand/sw-precache-webpack-plugin
 * - https://github.com/Klathmon/imagemin-webpack-plugin
 */