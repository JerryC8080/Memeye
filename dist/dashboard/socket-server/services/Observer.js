'use strict';

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var master = process; /*
                       * @Author: JerryC (huangjerryc@gmail.com)
                       * @Date: 2016-10-21 15:05:20
                       * @Last Modified by: JerryC
                       * @Last Modified time: 2016-10-21 15:24:14
                       * @Description
                       */

var Observer = new _events2.default();

// To Observer the 
master.on('message', function (message) {
  Observer.emit(message.name + ':' + message.event, message.data);
});

module.export = Observer;