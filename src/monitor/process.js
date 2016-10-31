/*
 * @Author: JerryC (huangjerryc@gmail.com)
 * @Date: 2016-10-21 11:20:45
 * @Last Modified by: JerryC
 * @Last Modified time: 2016-10-31 16:51:35
 * @Description
 */

import log from '../lib/log';
import Monitor from './Monitor';

class Process extends Monitor {
  constructor(mProcess, options) {
    super();  

    // Options from user.
    this.options = options;

    // TODO Use ES6 Symbol
    this.name = 'process';

    // The process need to monitor, it's likly the current node process.
    this.mProcess = mProcess;

    // Interval Instance of `setInterval` method. It is use to stop moniting.
    this.intervalInstance = null;

    // Events the Process monitor provider. 
    this.events = {
      CHANGE: 'change',
    };
  }
  
  /**
   * Running a monitor for the master process.
   */
  start() {
    const _this = this;
    const mProcess = _this.mProcess;
    const frequency = _this.options.monitor.process.frequency || _this.options.monitor.frequency || 1000;
    
    if (!mProcess) {
      throw new Error('Starting a monitor faild, casue attempt to listenning to an nonexistent process.');
    }
    
    if (_this.intervalInstance) {
      throw new Error('The monitor are listenning a process now, you should stop it at first.');
    }
    
    // Emit `change` event per 1 second.
    // And the outside should listen this event such as: `processMonitor.on('message', (usage) = {...} )`
    _this.intervalInstance = setInterval(() => {
      let data = mProcess.memoryUsage();
      log.debug(`[monitor/Process.js] process:emit:change:${JSON.stringify(data)}`);
      _this.emit(_this.events.CHANGE, data);
    }, frequency);
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

export default Process;