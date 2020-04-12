const path = require('path');

const serverless = process.env.ENV_SERVELESS;
const configServeless = serverless ? { target: serverless} : {};

require("dotenv").config();

module.exports = {
  ...configServeless,
  dir: './',
  env: {
    X_API_KEY: process.env.X_API_KEY
  },
  webpack(config, options) {
    const { dev } = options
    if (!dev) {
      config.devtool = 'source-map'
    }
    config.resolve.alias.components = path.join(__dirname, 'components')
    config.resolve.alias.static = path.join(__dirname, 'static')
    config.resolve.modules = [path.join(__dirname), 'node_modules']
    config.resolve.extensions = [
      '.ts',
      '.tsx',
      '.js',
      '.jsx',
      '.css',
      '.png',
      '.jpg',
      '.gif',
      '.jpeg'
    ]
    return config
  },
  exportPathMap() {
    return {
      '/': { page: '/' }
    }
  }
};

