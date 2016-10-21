'use strict';

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _log = require('../../../lib/log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * @Author: JerryC (huangjerryc@gmail.com)
 * @Date: 2016-10-20 18:00:01
 * @Last Modified by: JerryC
 * @Last Modified time: 2016-10-21 15:58:43
 * @Description
 */

var SignalHandler = {
  'name': function name() {
    // ... do logic
  }
};

var SocketHandler = function SocketHandler(socket) {
  console.log('An Client connected in ProcessController');
  socket.on('message', function (socket) {
    console.log('ProcessController does not handler message from Client');
  });
  socket.on('close', function (socket) {
    console.log('An Client disconnect in ProcessController');
  });

  socket.emit('message', 'Wellcome to ProcessController');

  // Register signal handler
  Object.keys(SignalHandler).forEach(function (key) {
    socket.on(key, SignalHandler[key]);
  });
};

function main(namespace) {

  // Hanlde connection
  namespace.on('connection', SocketHandler);

  // listen TickTockService, and send data to all client.
  ProcessService.on('message', function (data) {
    _log2.default.debug('Message from ProcessService: ' + _util2.default.inspect(data));
    namespace.send(data);
  });
}

module.exports = main;