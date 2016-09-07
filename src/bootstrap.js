'use strict';
const log = require("./lib/log");
const Monitor = require("./monitor");
const Dashboard = require("./dashboard");

module.exports = function () {
  // read config from global
  // merge config of default config
  // create monitor
  let processMonitor = new Monitor('process');

  let systemMonitor = new Monitor('system');

  // run monitor
  processMonitor.start();
  // systemMonitor.start();

  // run dashboard and set monitor
  Dashboard.start({
    'process': processMonitor
    // 'system': systemMonitor  
  });
}

