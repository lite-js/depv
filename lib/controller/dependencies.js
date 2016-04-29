'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _analyser = require('../analyser');

var _analyser2 = _interopRequireDefault(_analyser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return function (req, res /* , next */) {
    var query = req.query;
    try {
      _analyser2.default[query.analyser](query, function (data) {
        res.jsonRes(data);
      });
    } catch (e) {
      res.jsonRes({});
    }
  };
}; /**
    * controller module.
    * @module ./dependencies
    * @see module:../model/dependencies
    */