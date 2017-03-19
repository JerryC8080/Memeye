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

module.exports = function ({ port = 23333, log } = {}) {
    if (log) logger.setLevel(log);

    logger.info('Memeye seting up...... ');

    let dashboardProcess = child_process.fork(modulePath, [port]);

    logger.info('Initializing Collector...... ');

    let collector = new Collector(dashboardProcess);
    collector.start();

    // If Parent process exit, kill child process.
    process.on('exit', () => dashboardProcess.kill());

    // Handle child process's error
    dashboardProcess.once('error', (err) => {

        // Kill child process once it occur error.
        logger.error(`DashboardProcess occur an error: ${err.toString()}`);
        logger.error(`DashboardProcess should be stopping......`);
        dashboardProcess.kill();
    }).once('exit', (code, signal) => {

        // Stop collector while child process exit.
        logger.error(`DashboardProcess exited by code: ${code}`);
        logger.error(`Collector has been stopped.`);
        collector.stop();
    });
}