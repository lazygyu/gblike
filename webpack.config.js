const path = require('path');

module.exports = {
  entry: {
    game:'./src/app.ts',
    spriteEditor:'./src/spriteeditor.ts'

  },
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
    filename: '[name].js',
    path:path.resolve(__dirname, 'static')
  },
  node:{fs:'empty'}
}