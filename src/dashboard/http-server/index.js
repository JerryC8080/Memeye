/*
 * @Author: JerryC (huangjerryc@gmail.com)
 * @Date: 2016-10-21 15:32:45
 * @Last Modified by: JerryC
 * @Last Modified time: 2016-10-31 17:43:48
 * @Description
 */

import log from '../../lib/log';
import express from 'express';
import cors from 'cors';
import path from 'path';

const app = express();

export default function main(options) {
  const HTTP_PORT = options.dashboard.httpServer.port;

  // static server
  app.use(express.static(path.join(__dirname, '../../../public')));

  // cors
  app.use(cors());

  // route
  app.get('/api/options', (req, res) => { res.status(200).json(options); });

  app.listen(HTTP_PORT, () => {
    log.info(`Dashboard Server goes on http://localhost:${HTTP_PORT}`);
  });
}