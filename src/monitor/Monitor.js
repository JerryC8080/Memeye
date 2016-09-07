'use strict';
const log = require("../lib/log");
const EventEmitter = require('events');

class Monitor extends EventEmitter {
  constructor() {
    super();

    if(typeof this.start !== 'function') {
      let err = new Error('The `start` method should be implement.');
      log.err(err.message);
      throw err;
    }

    if(typeof this.stop !== 'function') {
      let err = new Error('The `stop` method should be implement.');
      log.err(err.message);
      throw err;
    }
  }
}

module.exports = Monitor;