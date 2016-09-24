'use strict';
const log = require("../lib/log");
const EventEmitter = require('events');

class Monitor extends EventEmitter {
  constructor() {
    super();

    if(typeof this.start !== 'function') {
      throw new Error('The `start` method should be implement.');
    }

    if(typeof this.stop !== 'function') {
      throw new Error('The `stop` method should be implement.');
    }
  }
}

module.exports = Monitor;