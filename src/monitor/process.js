'use strict';
const log = require("../lib/log");
const EventEmitter = require('events');

class Process extends EventEmitter {
  constructor(mProcess, options) {
    super();
    this.mProcess = mProcess;
    this.intervalInstance = null;
  }
  
  /**
   * Running a monitor for a master process.
   */
  start() {
    const _this = this;
    const mProcess = _this.mProcess;
    
    if (!mProcess) {
      log.err('Starting a monitor faild, casue want to listenning to an nonexistent process.');
      return ;
    }
    
    if (_this.mProcess && _this.intervalInstance) {
      log.err('The monitor are listenning a process now, you should stop it at first.');
      return ;
    }
    
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
      log.err('This monitor did not running, make sure you has been started the monitor');
      return ;
    }
    clearInterval(_this.intervalInstance);
    _this.intervalInstance = null;
    log.print('An Process monitor has been stoped.');
    return true;
  }
}

module.exports = Process;