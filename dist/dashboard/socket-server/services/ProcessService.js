'use strict';

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * @Author: JerryC (huangjerryc@gmail.com)
 * @Date: 2016-10-21 15:00:39
 * @Last Modified by: JerryC
 * @Last Modified time: 2016-10-21 15:57:12
 * @Description
 */

var ProcessService = new _events2.default();
var Observer = global.app.Observer;


Observer.on('process:change', function (data) {
  console.log('Message from Observer:process:change \n ' + _util2.default.inspect(data));

  // Here can handler and modify data.

  ProcessService.emit('change', data);
});

module.exports = ProcessService;