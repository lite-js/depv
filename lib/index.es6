/**
 * entry module.
 * @module ./index
 * @see module:./controller/visualize
 * @see module:./controller/dependenciesSVG
 */
import url from 'url';
import {
  resolve,
} from 'path';

import bodyParser from 'body-parser';
import connect from 'connect';
import getPort from 'get-port';
import hostname from 'os-hostname';
import open from 'open';
import serveStatic from 'serve-static';
import sprintf from 'zero-fmt/sprintf';
import urlrouter from 'urlrouter';
import {
  extend,
} from 'zero-lang';

/** visualize. */
import visualize from './controller/visualize';
import dependencies from './controller/dependencies';
import dependenciesSVG from './controller/dependenciesSVG';

const DEFAULT_CONFIG = {
  analyser: 'npm',
  root: process.cwd(),
};

function startServer(server, config) {
  /**
   * start the web server.
   * @function
   * @param {object} server - a connect server.
   * @param {object} config - configuration.
   */
  hostname((err, name) => {
    if (err) {
      name = '127.0.0.1';
    }
    server.listen(config.port);
    const uri = sprintf('http://%s:%d/visualize', name, config.port);
    if (config.open) {
      open(uri);
    }
  });
}

export default (config = {}) => {
  /**
   * entry function.
   * @function
   * @param {object} config - configuration for starting a server.
   */
  config = extend({}, DEFAULT_CONFIG, config);

  const server = connect();

  /** parsing body. */
  server
    .use(bodyParser.json()) // parse json body
    .use(bodyParser.urlencoded({
      extended: true,
    })) // parse urlencoded body
    .use(bodyParser.raw()) // parse raw body
    .use(bodyParser.text()); // parse text body

  /** adding utils to request and response context. */
  server.use((req, res, next) => {
    const urlInfo = url.parse(req.url, true);
    const query = urlInfo.query || {};
    const body = req.body || {};

    /** req.urlInfo */
    req.urlInfo = urlInfo;
    /** req.pathname */
    req.pathname = decodeURIComponent(urlInfo.pathname);

    /** req.params (combination of query and body) */
    req.params = extend({}, query, body);
    /** req.query */
    req.query = query;
    /** req.body */
    req.body = body;

    /** res.jsonRes(data) (generate JSON response) **/
    res.jsonRes = (data) => {
      const buf = new Buffer(JSON.stringify(data), 'utf8');
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.setHeader('Content-Length', buf.length);
      res.end(buf);
    };

    /** res.htmlRes(data) (generate HTML response) */
    res.htmlRes = (data) => {
      const buf = new Buffer(data);
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Content-Length', buf.length);
      res.end(buf);
    };

    next();
  });

  /** serving the static files */
  server.use('/src/locale', serveStatic(resolve(__dirname, '../src/locale')));
  server.use('/dist', serveStatic(resolve(__dirname, '../dist')));

  /** routing */
  server.use(urlrouter((app) => {
    /** serving the visulizing page */
    app.get('/visualize', visualize(config)); // needed to pass configuration to the web app

    /** serving dependencies as json format */
    app.get('/dependencies', dependencies());

    /** TODO serving the .svg file */
    app.get('/dependencies.svg', dependenciesSVG());
  }));

  if (config.port) {
    /** starting server in a particular port */
    startServer(server, config);
  } else {
    /** starting server in a random available port */
    getPort().then(port => {
      config.port = port;
      startServer(server, config);
    }, err => {
      throw err;
    });
  }
};
