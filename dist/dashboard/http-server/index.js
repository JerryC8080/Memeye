'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = main;

var _log = require('../../lib/log');

var _log2 = _interopRequireDefault(_log);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)(); /*
                                     * @Author: JerryC (huangjerryc@gmail.com)
                                     * @Date: 2016-10-21 15:32:45
                                     * @Last Modified by: JerryC
                                     * @Last Modified time: 2016-10-26 17:00:21
                                     * @Description
                                     */

var HTTP_PORT = 1340;

function main() {
  // static server
  app.use(_express2.default.static(_path2.default.join(__dirname, '../../../public')));

  app.listen(HTTP_PORT, function () {
    _log2.default.info('Dashboard Server goes on http://localhost:' + HTTP_PORT);
  });
}