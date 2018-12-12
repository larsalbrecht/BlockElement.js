const path = require('path')


const serverConfig = {
  mode: 'development',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lib.node.js'
  }
  //…
}

const clientConfig = {
  mode: 'development',
  target: 'web', // <=== can be omitted as default is 'web'
  entry: {
    BlockElement: './src/BlockElement.js'
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    library: 'BlockElement',
    libraryTarget: 'umd'
  },
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


const config = {
  mode: 'development',
  entry: './src/BlockElement.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'BlockElement.js'
  },
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

module.exports = clientConfig
