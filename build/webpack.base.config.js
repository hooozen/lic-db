const path = require('path');

const baseConfig = {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, '../src/main.js'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'main.js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../'), 
    port: 7777,
  },
};

module.exports = baseConfig;
