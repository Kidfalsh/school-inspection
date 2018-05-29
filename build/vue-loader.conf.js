var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  }),
  // cssSourceMap: sourceMapEnabled,
  // cacheBusting: config.dev.cacheBusting,
  // transformToRequire: {
  //   video: ['src', 'poster'],
  //   source: 'src',
  //   img: 'src',
  //   image: 'xlink:href'
  // }
}
