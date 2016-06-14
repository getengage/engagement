'use strict';

var _tracking = require('./tracking');

var _tracking2 = _interopRequireDefault(_tracking);

var _metrics = require('./metrics');

var _metrics2 = _interopRequireDefault(_metrics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  Scroll: _tracking2.default,
  Manager: _metrics2.default
};