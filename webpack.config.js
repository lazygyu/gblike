const path = require('path');

module.exports = {
  entry: './src/app.js',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude:/node_modules/
      }
    ]
  },
  resolve: {
    extensions:['.ts', '.js']
  },
  output: {
    filename: 'game.js',
    path:path.resolve(__dirname, 'static')
  }
}