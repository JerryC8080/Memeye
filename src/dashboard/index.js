'use strict';
const log = require("../lib/log");
const path = require('path');
const cp = require("child_process");

module.exports = {
  start: function (monitors) {
    if (!monitors) {
      log.err('Starting dashboard faild, monitors params necessary.');
      return;
    }
    
    /**
     * Fork a worker.
     * And listenning the monitor event and send it to worker.
     */
    let worker = cp.fork(path.join(__dirname, './worker.js'));
    log.info('Dashboard worker started no error.');

    const processMonitor = monitors['process'];
    
    processMonitor.on('change', (data) => {
      worker.send({
        type: 'process:change',
        data: data
      });
    });
  }
}
