'use strict';

module.exports = {
  events: {
    global: {
      INIT: 'Global:init'
    },
    heapUsed: {
      ADD_POINT: 'HeapUsed:addPoint'
    },
    heapSpace: {
      ADD_POINT: 'HeapSpace:addPoint'
    }
  }
};