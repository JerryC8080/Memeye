/**
 * Collector will collecting info from process、v8、os，
 * and send thiese data to dashboard process with IPC channel.
 */

const v8 = require('v8');
const os = require('os');
const logger = require('./Logger.js');

function Collector(dashboard, { frequency = 1000 } = {}) {
    this.dashboard = dashboard;
    this.interval = null;
    this.frequency = frequency;
}

Collector.prototype.stop = function () {
    clearInterval(this.interval);
}

Collector.prototype.start = function () {
    let that = this;

    if (that.interval) {
        console.error('Collector has been started');
        return;
    }

    that.interval = setInterval(() => {

        // collecing data
        let processStat = process.memoryUsage();
        let v8Stat = {
            heap: v8.getHeapStatistics(),
            heapSpace: v8.getHeapSpaceStatistics(),
        }
        let osStat = {
            freeMem: os.freemem(),
            totalMem: os.totalmem(),
            cpus: os.cpus(),
        }
        let data = [
            {
                type: 'process',
                value: processStat,
            },
            {
                type: 'v8',
                value: v8Stat,
            },
            {
                type: 'os',
                value: osStat
            }
        ]

        // sending data to dashboard process with IPC channel.
        that.dashboard.send(data);

        if (logger.level >= logger.levelMap['debug']) {
            logger.debug(`Collector heartbeat, data collected. -- size: ${(new Buffer(JSON.stringify(data))).length}, timestamp: ${Date.now()}`);
        }

    }, that.frequency);
}

module.exports = Collector;
