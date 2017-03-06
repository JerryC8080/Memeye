/**
 * The entry of Memeye.
 * This file will create collector for collecting info of this process.
 * and run dashboard on new process which has its own memory and v8 instance. 
 * The dashboard will recive data from collector and dispaly on a local website.
 */

const path = require('path');
const child_process = require('child_process');
const Collector = require('./lib/Collector.js');
const modulePath = path.join(__dirname, './dashboard');

module.exports = function ({ port = 23333 } = {}) {
    let dashboardProcess = child_process.fork(modulePath, [port]);
    process.on('exit', () => dashboardProcess.kill());
    let collector = new Collector(dashboardProcess);
    collector.start();
}