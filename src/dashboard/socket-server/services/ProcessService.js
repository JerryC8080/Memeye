/*
 * @Author: JerryC (huangjerryc@gmail.com)
 * @Date: 2016-10-21 15:00:39
 * @Last Modified by: JerryC
 * @Last Modified time: 2016-10-21 17:25:28
 * @Description
 */

import EventEmitter from 'events';
import util from 'util';

const ProcessService = new EventEmitter();
const { Observer } = global.app;

Observer.on('process:change', (data) => {
  // Here can handler and modify data.
  ProcessService.emit('change', data);
});

module.exports = ProcessService;

