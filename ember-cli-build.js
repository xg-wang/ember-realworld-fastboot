'use strict';

const path = require('path');
const { Webpack } = require('@embroider/webpack');
const purgecss = require('@fullhuman/postcss-purgecss')
const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    // Add options here
    postcssOptions: {
      compile: {
        enabled: true, // defaults to true
        browsers: ['last 2 versions'], // this will override config found in config/targets.js
        plugins: [
          purgecss({
            content: ['./**/*.hbs']
          })
        ]
      },
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return require('@embroider/compat').compatBuild(app, Webpack, {
    staticAddonTestSupportTrees: true,
    staticAddonTrees: true,
    staticHelpers: true,
    staticComponents: true,
    packagerOptions: {
      webpackConfig: {
        resolve: {
          alias: {
            marked: path.resolve(__dirname, 'node_modules/marked/lib/marked.esm.js'),
          },
        },
        plugins: [new BundleAnalyzerPlugin()],
      },
    },
    splitAtRoutes: ['editor', 'settings', 'register', 'login', 'articles', 'profile'],
  });
};
