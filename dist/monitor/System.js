'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _log = require('../lib/log');

var _log2 = _interopRequireDefault(_log);

var _Monitor2 = require('./Monitor');

var _Monitor3 = _interopRequireDefault(_Monitor2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Author: JerryC (huangjerryc@gmail.com)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Date: 2016-10-21 11:23:16
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Last Modified by:   JerryC
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Last Modified time: 2016-10-21 11:23:16
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Description
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var System = function (_Monitor) {
  _inherits(System, _Monitor);

  function System(initParams) {
    _classCallCheck(this, System);

    return _possibleConstructorReturn(this, (System.__proto__ || Object.getPrototypeOf(System)).call(this));
  }

  _createClass(System, [{
    key: 'start',
    value: function start() {}
  }, {
    key: 'stop',
    value: function stop() {}
  }]);

  return System;
}(_Monitor3.default);

exports.default = System;