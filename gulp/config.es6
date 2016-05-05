export const devPort = 1025;

// scripts working in node.js
export const scriptDirs = [
  'bin',
  'gulp',
  'lib',
];

// templates
export const templateDirs = [
  'lib',
  'src',
];

// for linting
export const lintingDirs = [
  'bin',
  'gulp',
  'lib',
  'src',
];

// for jsdoc
export const jsdocDirs = [
  'bin',
  'gulp',
  'lib',
  'src',
];

// jsdoc configuration
export const jsdocConfig = {
  tags: {
    allowUnknownTags: true,
  },
  source: {
    includePattern: '.+\\.js$',
    excludePattern: '(^|\\/|\\\\)_',
  },
  opts: {
    destination: './doc', // this field is TO BE OVERRIDDEN
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
