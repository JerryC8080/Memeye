'use strict';
const processMemUsage = require("./processMemUsage");

module.exports = {
  loadAll: function (io) {
    processMemUsage.load(io);
  },
  messageHandler: function (msg) {
    if (msg.type === 'process:change') {
      processMemUsage.addPoint(msg.data.rss, msg.data.heapUsed, msg.data.heapTotal);
    }
  }
}