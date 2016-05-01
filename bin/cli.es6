#!/usr/bin/env node

import {
  resolve,
} from 'path';
import {
  readFileSync,
} from 'fs';

import commander from 'commander';
import yaml from 'yaml';
import {
  each,
} from 'zero-lang';

import depv from '../lib/index';

const pkg = require(resolve(__dirname, '../package.json'));

commander
  .version(pkg.version)
  .description('to visualize the dependencies of your project.')
  .option('-a, --analyser <analyser>', 'define a npm module as a analyser(which will be passed to require() function)')
  .option('-c, --config <config>', 'config file (.yaml)')
  .option('-e, --entry <entry>', 'define the entry file for analyser')
  .option('-i, --ignore <ignore>', 'string to ignore')
  .option('-o, --open', 'open /visualize in a browser')
  .option('-p, --port <port>', 'define a port for the running server(default is a random port)')
  .option('-r, --root <root>', 'entry root')
  .option('-s, --separator <separator>', 'separator for modules')
  .option('-x, --extensions <extensions>', 'extensions, comma seperated')
  .parse(process.argv);

if (process.argv.length === 2) {
  commander.outputHelp();
} else {
  let config = {};
  const overrideConfigs = [
    'analyser',
    'entry',
    'extensions',
    'ignore',
    'open',
    'port',
    'root',
    'separator',
  ];

  try {
    if (commander.config) {
      config = yaml.eval(readFileSync(resolve(process.cwd(), commander.config)));
    }
  } catch (e) {
    // console.error('cannot locate the configuration file', e);
  }

  each(overrideConfigs, (c) => {
    if (commander[c]) {
      config[c] = commander[c];
    }
  });

  if (!config.port) {
    config.port = 1024;
  }
  depv(config);
}
