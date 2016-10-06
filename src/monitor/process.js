'use strict';
const log = require("../lib/log");
const Monitor = require('./Monitor');

class Process extends Monitor {
  constructor(mProcess, options) {
    super();  

    // TODO Use ES6 Symbol
    this.name = 'process';

    // The process need to monitor, it's likly the current node process.
    this.mProcess = mProcess;

    // Interval Instance of `setInterval` method. It is use to stop moniting.
    this.intervalInstance = null;
  }
  
  /**
   * Running a monitor for the master process.
   */
  start() {
    const _this = this;
    const mProcess = _this.mProcess;
    
    if (!mProcess) {
      throw new Error('Starting a monitor faild, casue attempt to listenning to an nonexistent process.');
    }
    
    if (_this.intervalInstance) {
      throw new Error('The monitor are listenning a process now, you should stop it at first.');
    }
    
    // Emit `change` event per 1 second.
    // And the outside should listen this event such as: `processMonitor.on('message', (usage) = {...} )`
    _this.intervalInstance = setInterval(() => {
      _this.emit('change', mProcess.memoryUsage());
    }, 1000); // TODO allow configing interval time
  }
  
  /**
   * Stop the monitor
   */
  stop() {
    const _this = this;

    if (!_this.intervalInstance) {
      throw new Error('This monitor did not running, make sure you has been started the monitor');
    }

    clearInterval(_this.intervalInstance);

    _this.intervalInstance = null;

    log.info('An Process monitor has been stoped.');
    
    return true;
  }
}

module.exports = Process;