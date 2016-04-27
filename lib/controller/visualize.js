'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _connect = require('connect');

var _connect2 = _interopRequireDefault(_connect);

var _urlrouter = require('urlrouter');

var _urlrouter2 = _interopRequireDefault(_urlrouter);

var _zeroLang = require('zero-lang');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_CONFIG = {
    analyzer: 'npm',
    root: process.cwd()
}; /**
    * visualize module.
    * @module ./visualize
    * @see module:./dependencies
    */

exports.default = function () {
    var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    /**
     * serving the `/visualize` url.
     * @function
     * @param {object} config - configuration for starting a visualize server
     */
    config = (0, _zeroLang.extend)({}, DEFAULT_CONFIG, config);
};