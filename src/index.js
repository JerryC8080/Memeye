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
const logger = require('./lib/Logger.js');

module.exports = function ({ port = 23333, log, frequency } = {}) {
    if (log) logger.setLevel(log);

    logger.info('Memeye seting up...... ');

    let dashboardProcess = child_process.fork(modulePath, [port]);
    process.on('exit', () => dashboardProcess.kill());

    logger.info('Initializing Collector...... ');

    let collector = new Collector(dashboardProcess, { frequency });
    collector.start();
}