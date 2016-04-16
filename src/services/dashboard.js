/**
 * Dashboard provide interfaces for send data to frontend by socket
 */
'use strict';
let io;
let socketConfig = require('../config/socket');

// TODO use disk store
let dataStore = {
  heapUsed: []
};

// a chart obj
let HeapUsed = {
  addPoint: function (rss, heapUsed, heapTotal) {
    // omit an socket event
    let data = {
      rss: rss,
      heapUsed: heapUsed,
      heapTotal: heapTotal
    };
    dataStore.heapUsed.push(data);
    io.emit(socketConfig.events.heapUsed.ADD_POINT, data);
  }
};

function init(server) {
  io = require('socket.io')(server);
  io.on('connection', function(){
    // Send data when a connection in.
    io.emit(socketConfig.events.global.INIT, dataStore);
  });
}

module.exports = {
  init: init,
  HeapUsed: HeapUsed
};