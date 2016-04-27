'use strict';
const log = require("../lib/log");
const http = require('http');
const fs = require('fs');
const path = require('path');
const IO = require("socket.io");
const homepage = path.resolve(__dirname, '../../homepage.html');

module.exports = {
  start: function (monitors) {
    if (!monitors) {
      log.err('Starting dashboard faild, monitors params necessary.');
      return;
    }
    
    // create httpserver
    let server = http.createServer(function (req, res) {
      // send homepage
      fs.createReadStream(homepage).pipe(res);
    });

    let io = IO(server);
    
    const processMonitor = monitors['process'];

    // linstenning the even that process change.
    processMonitor.on('change', (data) => {
      io.emit('process:change', data);
    });
    
    server.listen(1339, function () {
      console.log('dashboard running in : http://localhost:1339');
    });
  }
}