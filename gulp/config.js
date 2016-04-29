'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var devPort = exports.devPort = 1025;

var scriptDirs = exports.scriptDirs = [// scripts working in node.js
'bin', 'gulp', 'lib'];

var templateDirs = exports.templateDirs = [// templates
'lib', 'src'];

var lintingDirs = exports.lintingDirs = [// templates
'bin', 'gulp', 'lib', 'src'];

var jsdocDirs = exports.jsdocDirs = [// templates
'bin', 'gulp', 'lib', 'src'];

var jsdocConfig = exports.jsdocConfig = { // for jsdoc
  tags: {
    allowUnknownTags: true
  },
  source: {
    includePattern: '.+\\.js$',
    excludePattern: '(^|\\/|\\\\)_'
  },
  opts: {
    destination: './doc' },
  // TO BE OVERRIDE
  plugins: ['plugins/markdown'],
  templates: {
    cleverLinks: true,
    monospaceLinks: true,
    path: 'ink-docstrap',
    theme: 'cerulean',
    navType: 'vertical',
    linenums: true,
    dateFormat: 'YYYY-MM'
  }
};