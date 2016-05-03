'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (name) {
  var separator = arguments.length <= 1 || arguments[1] === undefined ? '/' : arguments[1];
  return name.split(separator)[0];
};