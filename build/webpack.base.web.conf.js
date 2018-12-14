const merge = require('webpack-merge')
const config = require('./webpack.base.conf')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(config, {
  target: 'web',
  output: {
    filename: 'BlockElement.web.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'web-example.html',
      template: path.resolve(__dirname + '/../template', 'example.html'),
      title: 'Web-Example',
      inject: 'head'
    })
  ]
})

