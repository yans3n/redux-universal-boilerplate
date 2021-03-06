var fs = require('fs');
var _ = require('lodash');
var webpack = require('webpack');
var path = require('path');
var config = require('../common.config');
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('../isomorphic.config'));
var appPath = path.join(__dirname, '..', '..');
var prodMode = process.env.NODE_ENV === 'production';
var devMode = process.env.NODE_ENV !== 'production';

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

var plugins = [];

var regExpGroups = [
  'styles',
  'fonts'
];

/**
 * Add node noop
 * @param {[type]} regExpGroup [description]
 */
function addNodeNoop(regExpGroup) {
  plugins.push(new webpack.NormalModuleReplacementPlugin(
    webpackIsomorphicToolsPlugin.regular_expression(regExpGroup),
    'node-noop'
  ));
}

var regExpGroup;

for (regExpGroup in regExpGroups) {
  if (regExpGroups.hasOwnProperty(regExpGroup)) {
    addNodeNoop(regExpGroups[regExpGroup]);
  }
}

plugins.push(new webpack.DefinePlugin({
  __CLIENT__: false,
  __SERVER__: true,
  __PRODUCTION__: prodMode,
  __DEV__: devMode
}));

if (prodMode) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }));
}

module.exports = _.mergeWith(config, {
  target: 'node',
  devtool: 'source-map',
  entry: [
    path.resolve(path.join(appPath, 'src', 'server'))
  ],
  externals: nodeModules,
  output: {
    path: path.resolve(path.join(appPath, 'dist')),
    publicPath: '/',
    filename: 'server.js'
  },
  plugins: plugins
}, function(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
});
