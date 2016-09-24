'use strict';
const log = require("../lib/log");
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const http = require('http');
const IO = require("socket.io");
const publicDir = path.resolve(__dirname, '../../public');

// Setup statics
app.use(express.static(publicDir));

// Create server of app
let server = http.Server(app);

// Setup io
let io = IO(server);

// load all charts
const charts = require("../charts");
charts.loadAll(io);

// Linstenning the even that process change.
// Then handler by charts.  
process.on('message', charts.messageHandler);

server.listen(1339, function () {
  log.info('Dashboard running in : http://localhost:1339');
});