'use strict';
const log = require('../lib/log');
const monitorClass = {
  'Process': require("./process"),
  'System': require("./system")
}

class Monitor {
  constructor(options){
    let monitorConstructor = monitorClass[options.className];
    if (!monitorConstructor) {
      log.error('no sort that named ' +  options.className + ' of class');
      return null;
    } else {
      return monitorConstructor(options.initParams);
    }
  }
}


module.exports = Monitor;