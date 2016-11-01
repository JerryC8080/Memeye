/*
 * @Author: JerryC (huangjerryc@gmail.com)
 * @Date: 2016-10-21 11:37:42
 * @Last Modified by: JerryC
 * @Last Modified time: 2016-11-01 16:36:26
 * @Description
 */

import options from './config/options.js';
import cluster from 'cluster';
import _ from 'lodash';
import log from './lib/log';
import { Process } from './monitor';
import Dashboard from './dashboard';

function addMonitor(monitor, worker) {
  let events = monitor.events;

  if (_.isEmpty(events)) {
    return log.error(`${monitor.name} Monitor no events`);
  }

  Object.keys(events).forEach((key) => {
    let event = events[key];
    log.debug(`[${bootstrap.js}] listening:on:${monitor.name}:${event}`);

    // Handle all event of monitor and send it to worker.
    monitor.on(event, (data) => {
      worker.send({
        name: monitor.name,
        event: event,
        data: data,
      });
    });
  });
}

export default function bootstrap(opt = {}) {

  // Merge user options.
  let _options = _.merge(options, opt);

  // Gloable options
  global.options = _options;

  /**
   * For memory isolation we will run worker process here.
   * The master process do:
   *    1. make monitors running.
   *    2. forwarding message from monitor to worker process.
   * The worker process do:
   *    1. make dashboard running.
   *    2. dashboard will have a observer that receiver message from master and distribute to suitable controllers.
   */
  if (cluster.isMaster) {

    let monitors = [
      new Process(process, _options),
    ];

    // start monitor
    monitors.forEach((monitor) => monitor.start());

    // fork worker    
    log.debug(`[bootstrap.js] Strating worker`);
    let worker = cluster.fork();

    // Listeng the change event of process monitor, and send data to worker if it's emitted.
    monitors.forEach((monitor) => { addMonitor(monitor, worker); });

  } else if (cluster.isWorker) {
    
    // start dashboard
    log.debug(`[bootstrap.js] Started worker ... ${cluster.worker.id}`);
    Dashboard(_options);
  }
}

