const withCSS = require('@zeit/next-css');
const withImages = require('next-images');
const path = require('path');

module.exports = withImages(
  withCSS({
    publicRuntimeConfig: {
      localeSubpaths: typeof process.env.LOCALE_SUBPATHS === 'string'
        ? process.env.LOCALE_SUBPATHS
        : 'none',
    },
    webpack: (config, options) => {
      cssModules: true,
      config.module.rules.push({
        rules: [
          {
            test: /\.css$/i,
            use: ['css-loader'],
            include: [path.join(__dirname, '..', 'node_modules')],
          },
        ],
      }),
      // config.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.js?$/,
      //     exclude: [/node_modules/],
      //     loader: 'eslint-loader',
      //     options: {
      //       quiet: true,
      //     }
      // });
      config.node = {
        fs: 'empty'
      };
      return config;
    },
  })
);
