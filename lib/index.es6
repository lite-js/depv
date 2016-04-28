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

import connect from 'connect';
import getPort from 'get-port';
import hostname from 'os-hostname';
import json from 'zero-encoding/json';
import open from 'open';
import serveStatic from 'serve-static';
import sprintf from 'zero-fmt/sprintf';
import urlrouter from 'urlrouter';
import {
  extend,
} from 'zero-lang';

/** visualize. */
import visualize from './controller/visualize';
import dependenciesSVG from './controller/dependenciesSVG';

const DEFAULT_CONFIG = {
  analyzer: 'npm',
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

  /** adding utils to request and response context. */
  server.use((req, res, next) => {
    const urlInfo = url.parse(req.url, true);
    const query = urlInfo.query || {};
    const body = req.body || {};

    /** req._urlInfo */
    req.urlInfo = urlInfo;
    /** req._pathname */
    req.pathname = decodeURIComponent(urlInfo.pathname);

    /** req._params (combination of query and body) */
    req.params = extend({}, query, body);
    /** req._query */
    req.query = query;
    /** req._body */
    req.body = body;

    /** res._JSONRes(data) (generate JSON response) **/
    res.jsonRes = (data) => {
      const buf = new Buffer(json.stringify(data), 'utf8');
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.setHeader('Content-Length', buf.length);
      res.end(buf);
    };

    /** res._HTMLRes(data) (generate HTML response) */
    res.htmlRes = (data) => {
      const buf = new Buffer(data);
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Content-Length', buf.length);
      res.end(buf);
    };

    next();
  });

  /** serving the static files */
  server.use('/dist', serveStatic(resolve(__dirname, '../dist')));

  /** routing */
  server.use(urlrouter((app) => {
    /** serving the visulizing page */
    app.get('/visualize', visualize(config)); // needed to pass configuration to the web app
    app.get('/dependencies.svg', dependenciesSVG);
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
