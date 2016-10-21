/*
 * @Author: JerryC (huangjerryc@gmail.com)
 * @Date: 2016-10-20 18:00:01
 * @Last Modified by: JerryC
 * @Last Modified time: 2016-10-21 17:29:14
 * @Description
 */

import util from 'util';
import log from '../../../lib/log';

const SignalHandler = {
  'name': function name() {
    // ... do logic
  }
}

const SocketHandler = function (socket) {
  log.debug(`[ProcessController.js] An Client connected in ProcessController`);
  socket.on('message', (socket) => { log.debug(`[ProcessController.js] ProcessController does not handler message from Client`); });
  socket.on('close', (socket) => { log.debug(`[ProcessController.js] An Client disconnect in ProcessController`); });

  socket.emit('message', 'Wellcome to ProcessController');

  // Register signal handler
  Object.keys(SignalHandler).forEach((key) => { socket.on(key, SignalHandler[key]) });
}

function main(namespace) {

  // Hanlde connection
  namespace.on('connection', SocketHandler);

  // listen TickTockService, and send data to all client.
  ProcessService.on('change', (data) => {
    log.debug(`[ProcessController.js] Message from ProcessService: ${util.inspect(data)}`);
    namespace.send(data);
  });
}

module.exports = main;