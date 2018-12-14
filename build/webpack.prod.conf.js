const merge = require('webpack-merge')
const baseNodeConfig = require('./webpack.base.node.conf')
const baseWebConfig = require('./webpack.base.web.conf')

const prodBaseConfig = {
  mode: 'production',
  devtool: 'source-map'
}

const prodBaseNodeConfig = merge(prodBaseConfig, {
  output: {
    filename: 'BlockElement.node.min.js'
  }
})

const prodBaseWebConfig = merge(prodBaseConfig, {
  output: {
    filename: 'BlockElement.web.min.js'
  }
})

const prodNodeConfig = merge(baseNodeConfig, prodBaseNodeConfig)
const prodWebConfig = merge(baseWebConfig, prodBaseWebConfig)

module.exports = [
  prodWebConfig
]
