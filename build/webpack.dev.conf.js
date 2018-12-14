const merge = require('webpack-merge')
const baseNodeConfig = require('./webpack.base.node.conf')
const baseWebConfig = require('./webpack.base.web.conf')

const devBaseConfig = {
  mode: 'development',
  devtool: 'inline-source-map'
}

const devNodeConfig = merge(baseNodeConfig, devBaseConfig)
const devWebConfig = merge(baseWebConfig, devBaseConfig)

module.exports = [
  devWebConfig
]

