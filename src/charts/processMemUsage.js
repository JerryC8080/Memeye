'use strict';
const log = require("../lib/log");
const db = require("../db").dbAsync;

let io;
const chartsConfig = require("../config/charts").processMemoryUsage;
const chartName = chartsConfig.name;
const options = chartsConfig.options;
const events = chartsConfig.events;

function load(_io) {
  io = _io;
  
  // find or create
  db.findOneAsync({name: chartName}).then((processMemUsage) => {
    if (!processMemUsage) {
      return db.insertAsync({
        name: chartName,
        options: options
      });
    } else {
      return processMemUsage;
    }
  }).then((data) => {
    
    // listenning on connections
    if(io) {
      io.on('connection', (socket) => {
        sendOptions();
      });
    }
  }).catch(log.err);
}

/**
 * Add a point in chart
 */
function addPoint(rss, heapUsed, heapTotal) {
  let date = Date.now();
  let point = [
    [date, rss],
    [date, heapUsed],
    [date, heapTotal]
  ]
  db.update({
    name: chartName
  }, {
    $push: {
      'options.series.0.data': point[0],
      'options.series.1.data': point[1],
      'options.series.2.data': point[2],
    }
  }, {
    returnUpdatedDocs: true
  }, (err, numAffected, affectedDocuments) => {
    if(err) log.err(err);
    _emitIOEvent(events.addPoint, point);
  });
}

/**
 * Get current options data of chart
 */
function sendOptions() {
  db.findOneAsync({name: chartName}).then((processMemUsage) => {
    _emitIOEvent(events.init, processMemUsage.options);
  }).catch(log.err);
}

function _emitIOEvent(event, data) {
  if (io) {
    io.emit(event, data);
  } else {
    log.error('io is not defined');
  }
}

module.exports = {
  addPoint: addPoint,
  load: load
}