'use strict';
const log = require("../lib/log");
const path = require('path');
const cp = require("child_process");
const _ = require('lodash');
const EVENTS = ['change'];

module.exports = {

  /**
   * Starting dashboard for monitors
   */
  start: function (monitors) {
    if (_.isEmpty(monitors)) {
      throw new Error('Starting dashboard faild, monitors params necessary.');
    }

    /**
     * Fork a worker.
     * And listenning the monitor event and send it to worker.
     */
    let worker = cp.fork(path.join(__dirname, './worker.js'));
    log.info('Dashboard worker started no error.');

    // Listeng the change event of process monitor and send data to worker if it's emitted.
    monitors.forEach((monitor) => {
      EVENTS.forEach((event) => {
        log.debug(`listening:on:${monitor.name}:${event}`);
        monitor.on(event, (data) => {
          worker.send({
            name: monitor.name,
            event: event,
            data: data
          });
        });
      })
    });
  }
}
