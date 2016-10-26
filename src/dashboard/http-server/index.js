/*
 * @Author: JerryC (huangjerryc@gmail.com)
 * @Date: 2016-10-21 15:32:45
 * @Last Modified by: JerryC
 * @Last Modified time: 2016-10-26 17:02:32
 * @Description
 */

import log from '../../lib/log';
import express from 'express';
import path from 'path';

const app = express();
const HTTP_PORT = 1340;

export default function main() {
  // static server
  app.use(express.static(path.join(__dirname, '../../../public')));

  app.listen(HTTP_PORT, () => {
    log.info(`Dashboard Server goes on http://localhost:${HTTP_PORT}`);
  })
}