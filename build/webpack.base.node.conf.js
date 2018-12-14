const merge = require('webpack-merge')
const config = require('./webpack.base.conf')

module.exports = merge(config, {
  target: 'node',
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false,   // if you don't put this is, __dirname
    __filename: false  // and __filename return blank or /
  },
  output: {
    filename: 'BlockElement.node.js'
  }
})

