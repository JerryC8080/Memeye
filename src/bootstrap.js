'use strict';
const log = require("./")
const config = require("./config");
const Monitor = require("./monitor");
const Dashboard = require("./dashboard");

const http = require('http');
const fs = require('fs');
const path = require('path');
const IO = require("socket.io");
const homepage = path.resolve(__dirname, '../homepage.html');


// read config from global
// merge config of default config
// create monitor
let processMonitor = new Monitor({
  className: 'Process'
});

let systemMonitro = new Monitor({
  className: 'System'
});

// run monitor
processMonitor.start();
systemMonitor.start();

// create httpserver
let server = http.createServer(function (req, res) {
  // send homepage
  fs.createReadStream(homepage).pipe(res);
});

let io = IO(server);

// run dashboard and set monitor
dashboard.start(io, {
  'process': processMonitor,
  'system': systemMonitor  
});

server.listen(1339, function () {
  console.log('server start');
});