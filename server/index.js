'use strict';

const serialize = require('serialize-javascript');
const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs');

const BASE_DIRECTORY = 'dist';
const SERVE_FROM = path.join(process.cwd(), BASE_DIRECTORY);
const DEFAULT_INDEX = path.join(SERVE_FROM, 'index.html');

function meta(name, content) {
  const $ = cheerio.load('<meta name="' + name + '" />');
  return $('meta').attr('content', content);
}

function serveStatic(baseDirectory) {
  return function (req, res, next) {
    if (!path.extname(req.path)) {
      return next();
    }

    var filePath = path.join(baseDirectory, req.path);

    fs.stat(filePath, function (err, stats) {
      if (err) {
        return next();
      }

      res.sendFile(path.join(process.cwd(), '/', filePath), function (err) {
        if (err) {
          return next(err);
        }
      });
    });
  };
}

module.exports = function (app) {
  app.use(serveStatic(BASE_DIRECTORY));

  app.use(function writeIntlStateToDom(req, res, next) {
    if (req.url === '/ember-cli-live-reload.js') {
      return next();
    }

    fs.readFile(DEFAULT_INDEX, { encoding: 'utf8' }, function (err, data) {
      const $ = cheerio.load(data);
      res.status(200).send($.html());
    });
  });
};
