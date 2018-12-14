const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const baseConfig = {
  entry: {
    BlockElement: path.resolve(__dirname + '/../src', 'BlockElement.js')
  },
  output: {
    path: path.resolve(__dirname + '/../', 'lib'),
    filename: 'BlockElement.js',
    libraryTarget: 'umd'
  },
  plugins: [
    new CleanWebpackPlugin([path.resolve(__dirname + '/../lib')], {root: path.resolve(__dirname + '/..')})
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}

module.exports = baseConfig
