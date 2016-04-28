'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _visualize = require('../template/visualize');

var _visualize2 = _interopRequireDefault(_visualize);

var _json = require('zero-encoding/json');

var _json2 = _interopRequireDefault(_json);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (config) {
    return function (req, res, next) {
        res._HTMLRes((0, _visualize2.default)({
            config: _json2.default.stringify(config)
        }));
    };
};