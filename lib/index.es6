/**
 * entry module.
 * @module ./visualize
 * @see module:./dependencies
 */
import {
    resolve
} from 'path';

import connect from 'connect';
import hostname from 'os-hostname';
import serveStatic from 'serve-static';
import urlrouter from 'urlrouter';
import {
    extend
} from 'zero-lang';

/** visualize. */
import visualize from './controller/visualize';

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
        let url = sprintf('http://127.0.0.1:%d/', config.port);
        if (config.open) {
            require('open')(url);
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

    let server = connect();

    /** serving the static files */
    server.use('/dist', serveStatic(resolve(__dirname, '../dist')));

    /** serving the visulizing page */
    server.use();

    if (config.port) {
        startServer(server, config);
    } else {
        getPort(function (err, port) {
            if (err) {
                throw err;
            }
            config.port = port;
            startServer(server, config);
        });
    }
};
