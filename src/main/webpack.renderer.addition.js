/* eslint-disable @typescript-eslint/no-var-requires */
const merge = require('webpack-merge');
module.exports = function (config) {
  config = merge.smart(config, {});
  return config;
};
