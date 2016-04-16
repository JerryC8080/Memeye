/**
 * Listener for collecting infomations of memory heap usage.
 */
'use strict';
let listenConfig = require('../config/listeners');

class HeapUsedListener {
  constructor() {
    this.timer = null;
    this.name = listenConfig.names.HEAP_USED;
  }

  listen(handler){
    this.timer = setInterval(function () {
      let mem = process.memoryUsage();
      handler(mem.rss, mem.heapUsed, mem.heapTotal);
    }, 1000); // TODO support config listening frequency
  }

  stop(){
    if (this.timer){
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}

module.exports = HeapUsedListener;