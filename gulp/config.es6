import {
  readFileSync,
} from 'fs';
import {
  resolve,
} from 'path';

export const scriptDirs = [ // scripts working in node.js
  'bin',
  'gulp',
  'lib',
];

export const templateDirs = [ // templates
  'lib',
  'src',
];

export const lintingDirs = [ // templates
  'bin',
  'gulp',
  'lib',
  'src',
];

export const jsdocDirs = [ // templates
  'bin',
  'gulp',
  'lib',
  'src',
];

export const jsdocConfig = { // for jsdoc
  tags: {
    allowUnknownTags: true,
  },
  source: {
    includePattern: '.+\\.js$',
    excludePattern: '(^|\\/|\\\\)_',
  },
  opts: {
    destination: './doc', // TO BE OVERRIDE
  },
  plugins: [
    'plugins/markdown',
  ],
  templates: {
    cleverLinks: true,
    monospaceLinks: true,
    path: 'ink-docstrap',
    theme: 'cerulean',
    navType: 'vertical',
    linenums: true,
    dateFormat: 'YYYY-MM',
  },
};

console.log(readFileSync(resolve(__dirname, '../node_modules/evil-icons/assets/sprite.svg')));

export const svgSprite = readFileSync(resolve(__dirname, '../node_modules/evil-icons/assets/sprite.svg'));


