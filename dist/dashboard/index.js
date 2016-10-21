'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = start;

var _httpServer = require('./http-server');

var _httpServer2 = _interopRequireDefault(_httpServer);

var _socketServer = require('./socket-server');

var _socketServer2 = _interopRequireDefault(_socketServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * @Author: JerryC (huangjerryc@gmail.com)
 * @Date: 2016-10-21 11:38:48
 * @Last Modified by: JerryC
 * @Last Modified time: 2016-10-21 16:47:34
 * @Description
 */

function start() {
  (0, _httpServer2.default)();
  (0, _socketServer2.default)();
}