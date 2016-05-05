'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var devPort = exports.devPort = 1025;

// scripts working in node.js
var scriptDirs = exports.scriptDirs = ['bin', 'gulp', 'lib'];

// templates
var templateDirs = exports.templateDirs = ['lib', 'src'];

// for linting
var lintingDirs = exports.lintingDirs = ['bin', 'gulp', 'lib', 'src'];

// for jsdoc
var jsdocDirs = exports.jsdocDirs = ['bin', 'gulp', 'lib', 'src'];

// jsdoc configuration
var jsdocConfig = exports.jsdocConfig = {
  tags: {
    allowUnknownTags: true
  },
  source: {
    includePattern: '.+\\.js$',
    excludePattern: '(^|\\/|\\\\)_'
  },
  opts: {
    destination: './doc' },
  // this field is TO BE OVERRIDDEN
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