/**
 * Handle the data from the listener
 */
'use strict';
let fs = require('fs');
let path = require('path');
let dashboard = require('./dashboard');
let listeners = {};

/**
 * run monitor
 * @param options
 */
function init(options) {

  // start listeners
  startHeapUsedListener();

}

/**
 * Get listeners by name
 * @param name the name of listener
 * @returns {*}
 */
function getListeners(name) {
  return listeners[name];
}

/**
 * Start HeapUsedListener
 */
function startHeapUsedListener() {
  let HeapUsedListener = require('../listeners/heapUsed');
  let heapUsedChart = dashboard.HeapUsed;
  let listener = new HeapUsedListener();

  // put listener instance into listeners map.
  listeners[listener.name] = listener;

  // make listener working.
  listener.listen(function handler(rss, heapUsed, heapTotal) {
    heapUsedChart.addPoint(rss, heapUsed, heapTotal);
  });
}

module.exports = {
  init: init,
  getListeners: getListeners
};

