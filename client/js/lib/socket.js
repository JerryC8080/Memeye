/*
 * @Author: JerryC (huangjerryc@gmail.com)
 * @Date: 2016-10-25 16:36:55
 * @Last Modified by: JerryC
 * @Last Modified time: 2016-10-31 17:54:20
 * @Description
 */

import SocketClient from 'socket.io-client';

const controllers = {};

function init() {
  const SERVER_PORT = window.options.dashboard.socketServer.port;
  const SERVER_HOST = `ws://localhost:${SERVER_PORT}`;
  controllers.Process = SocketClient.connect(`${SERVER_HOST}/api/process`);
  controllers.Process.on('message', console.log);
}

export default {
  init,
  controllers,
};