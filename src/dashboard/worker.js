'use strict';
const log = require("../lib/log");
const http = require('http');
const fs = require('fs');
const path = require('path');
const IO = require("socket.io");
const homepage = path.resolve(__dirname, '../../homepage.html');

// create httpserver
let server = http.createServer(function (req, res) {
  // send homepage
  fs.createReadStream(homepage).pipe(res);
});

let io = IO(server);

// load all charts
const charts = require("../charts");
charts.loadAll(io);

// linstenning the even that process change.     
process.on('message', charts.messageHandler);

server.listen(1339, function () {
  log.info('Dashboard running in : http://localhost:1339');
});