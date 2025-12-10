// electron-webpack – minimal configuration for a renderer + preload setup.
const path = require('path');

module.exports = {
  entryPoints: {
    main: './src/main.js',
    preload: './src/preload.js'
  },
  // expose the preload script as `snapdock` via contextBridge (see preload.js)
  webpackConfig: {
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist')
    }
  }
};
