#!/usr/bin/env node

import {
    resolve
} from 'path';

import commander from 'commander';
import getPort from 'get-port';
import {
    each,
    extend
} from 'zero-lang';

import depv from '../lib/index';

const pkg = require(resolve(__dirname, '../package.json'));

commander
    .version(pkg.version)
    .description('to visualize the dependencies of your project.')
    .option('-a, --analyser <analyser>', 'define a npm module as a analyser(which will be passed to require() function)')
    .option('-c, --config <config>', 'config file (js or json file)')
    .option('-e, --entry <entry>', 'define the entry file for analyser')
    .option('-o, --open', 'open /visualize in a browser')
    .option('-p, --port <port>', 'define a port for the running server(default is a random port)')
    .option('-s, --separator <separator>', 'separator for modules')
    .parse(process.argv);

if (process.argv.length === 2) {
    commander.outputHelp();
} else {
    let config = {};
    const overrideConfigs = [
        'analyser',
        'entry',
        'port',
        'separator'
    ];

    try {
        commander.config && (config = require(path.resolve(process.cwd(), commander.config)));
    } catch (e) {
        console.error('cannot locate the configuration file', e);
    }

    each(overrideConfigs, (c) => {
        commander[c] && (config[c] = commander[c]);
    });

    config.open = true;

    depv(config);
}


