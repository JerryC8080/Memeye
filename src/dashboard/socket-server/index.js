/*
 * @Author: JerryC (huangjerryc@gmail.com)
 * @Date: 2016-10-20 22:38:24
 * @Last Modified by: JerryC
 * @Last Modified time: 2016-10-31 16:53:39
 * @Description
 */

import SocketIO from 'socket.io';
import fs from 'fs';
import Promise from 'bluebird';
import path from 'path';
import EventEmitter from 'events';

const fsAsync = Promise.promisifyAll(fs);

/**
 * Observer for master process.
 * It will listen message from master, and distribute to suitable controllers to handle.  
 */
async function Observer() {
  const master = process;
  const Observer = new EventEmitter();
 
  master.on('message', (message) => {
    Observer.emit(`${message.name}:${message.event}`, message.data);
  });

  global.app.Observer = Observer;

  return Observer;
}

/**
 * Load config or controllers or services file.
 * @param  {String} dir The path that need load.
 */
async function loadFiles(dir) {
  let files = await fsAsync.readdirAsync(path.join(__dirname, `./${dir}`));
  files.forEach((file) => {
    let filename = path.parse(file).name;
    global[filename] = global.app[dir][filename] = require(`./${dir}/${file}`);
  });
  return global.app;
}

/**
 * Load Socket Server. 
 */
async function loadSocket(port) {

  // Run io server.
  const io = SocketIO(port);
  global.app.socket = io;
  return global.app;
}

/**
 * Load route for every controllers.
 * @param  {Objcet} app
 */
async function loadRoute(app) {
  const routes = global.app.config.routes;
  const io = global.app.socket;
  const controllers = global.app.controllers;

  // init routes
  Object.keys(routes).forEach((path) => {
    let controller = routes[path];
    let nsp = io.of(path);
    controllers[controller](nsp);
  });
}

/**
 * The main method to export.
 */
async function main(options) {
  if (!global.app) global.app = { services: {}, controllers: {}, config: {} };

  // Run Observer
  await Observer();

  // loadServices
  await loadFiles('services');

  // loadControllers
  await loadFiles('controllers');

  // loadConfig
  await loadFiles('config');

  // loadSocket server
  await loadSocket(options.dashboard.socketServer.port);

  // loadRoute
  await loadRoute(global.app);

}

export default main;