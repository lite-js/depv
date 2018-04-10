#!/usr/bin/env node
const path = require('path');
const launchElectronApp = require('../lib/launch-electron-app');

launchElectronApp(path.resolve(__dirname, '../depv.js'));
