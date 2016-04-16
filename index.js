'use strict';
let http = require('http');
let fs = require('fs');
let path = require('path');
let monitor = require('./src/services/monitor');
let dashboard = require('./src/services/dashboard');
let homepage = path.resolve(__dirname, './homepage.html');

// create httpserver
let server = http.createServer(function (req, res) {
  // send homepage
  fs.createReadStream(homepage).pipe(res);
});

// run monitor
monitor.init();

// run dashboard
dashboard.init(server);

server.listen(1339, function () {
  console.log('server start');
});