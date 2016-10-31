/*
 * @Author: JerryC (huangjerryc@gmail.com)
 * @Date: 2016-10-21 11:38:48
 * @Last Modified by: JerryC
 * @Last Modified time: 2016-10-31 16:22:50
 * @Description
 */

import HttpServer from './http-server';
import SocketServer from './socket-server';

export default function start(_options) {
  HttpServer(_options);
  SocketServer(_options);
}