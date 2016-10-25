/*
 * @Author: JerryC (huangjerryc@gmail.com)
 * @Date: 2016-10-25 16:36:55
 * @Last Modified by: JerryC
 * @Last Modified time: 2016-10-25 18:03:09
 * @Description
 */

import SocketClient from 'socket.io-client';

const SERVER_HOST = 'ws://localhost:1339';
const controllers = {}

function init() {
  controllers.Process = SocketClient.connect(`${SERVER_HOST}/api/process`);
  controllers.Process.on('message', console.log);
}

export default {
  init,
  controllers,
}