'use strict';

import log from '../lib/log';
import EventEmitter from 'events';

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

export default Monitor;