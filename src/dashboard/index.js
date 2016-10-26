/*
 * @Author: JerryC (huangjerryc@gmail.com)
 * @Date: 2016-10-21 11:38:48
 * @Last Modified by: JerryC
 * @Last Modified time: 2016-10-26 16:57:17
 * @Description
 */

import HttpServer from './http-server';
import SocketServer from './socket-server';

export default function start() {
  HttpServer();
  SocketServer();
}