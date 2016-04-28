'use strict';

var _path = require('path');

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var _gulpPlumber = require('gulp-plumber');

var _gulpPlumber2 = _interopRequireDefault(_gulpPlumber);

var _gulpRename = require('gulp-rename');

var _gulpRename2 = _interopRequireDefault(_gulpRename);

var _sprintf = require('zero-fmt/sprintf');

var _sprintf2 = _interopRequireDefault(_sprintf);

var _through = require('through2');

var _through2 = _interopRequireDefault(_through);

var _template2module = require('template2module');

var _template2module2 = _interopRequireDefault(_template2module);

var _zeroLang = require('zero-lang');

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var underscoreEngine = _template2module2.default.engines.underscore;


function renderTemplates() {
  return _through2.default.obj(function render(file, enc, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isStream()) {
      this.emit('error', new _gulpUtil2.default.PluginError('template2module', 'Streaming not supported'));
    }

    try {
      _gulpUtil2.default.log(file.path);
      var content = underscoreEngine.render(file.contents.toString('utf8').replace(/<!\-\-SVG_SPRITE\-\->/g, _config.svgSprite), file.path, 'commonjs');
      file.contents = new Buffer(content);
    } catch (err) {
      this.emit('error', new _gulpUtil2.default.PluginError('template2module', err.toString()));
    }

    this.push(file);
    return cb();
  });
}

// TODO add svg sprite file into HTML if needed

(0, _zeroLang.each)(_config.templateDirs, function (dir) {
  _gulp2.default.task((0, _sprintf2.default)('template2module-%s', dir), function () {
    return _gulp2.default.src((0, _path.resolve)(__dirname, (0, _sprintf2.default)('../%s/**/*.html', dir))).pipe((0, _gulpPlumber2.default)()).pipe(renderTemplates()).on('error', function (err) {
      _gulpUtil2.default.log(_gulpUtil2.default.colors.red(err.message));
    }).pipe((0, _gulpRename2.default)(function (path) {
      path.extname = '.js';
    })).pipe(_gulp2.default.dest((0, _path.resolve)(__dirname, (0, _sprintf2.default)('../%s/', dir))));
  });
});

_gulp2.default.task('template2module', (0, _zeroLang.map)(_config.templateDirs, function (dir) {
  return (0, _sprintf2.default)('template2module-%s', dir);
}));