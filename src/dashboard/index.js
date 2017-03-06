/**
 * The dashboard , will calling as process way.
 * This file will create an Indicator instance and start a http server which provide WebSocket service.
 * Then bind indicator with process IPC channel, to recive massage from parent process.
 * And then bind the indicator with socketio, to send message while indicator attrbutes changing.
 */

const Indicator = require('../lib/Indicators');
const server = require('./server');

const port = process.argv[2] || 23333;
let indicator = new Indicator({

    // process
    rss: 'indicators:rss',
    heapTotal: 'indicators:heapTotal',
    heapUsed: 'indicators:heapUsed',

    // os
    freeMem: 'indicators:freeMem',
    totalMem: 'indicators:totalMem',
    cpus: 'indicators:cpus',

    // v8 heap space
    newSpace: 'indicators:newSpace',
    oldSpace: 'indicators:oldSpace',
    codeSpace: 'indicators:codeSpace',
    mapSpace: 'indicators:mapSpace',
    largeObjectSpace: 'indicators:largeObjectSpace',

});

// Bind process IPC channel to indicator
function bindIndicators(indicator) {

    // Parent process will send three type of data
    const collectorHandler = {
        'process': function (value) {
            indicator.rss = value.rss;
            indicator.heapTotal = value.heapTotal;
            indicator.heapUsed = value.heapUsed;
        },
        'os': function (value) {
            indicator.totalMem = value.totalMem;
            indicator.freeMem = value.freeMem;
            indicator.cpus = value.cpus;
        },
        'v8': function (value) {
            indicator.newSpace = value.heapSpace[0];
            indicator.oldSpace = value.heapSpace[1];
            indicator.codeSpace = value.heapSpace[2];
            indicator.mapSpace = value.heapSpace[3];
            indicator.largeObjectSpace = value.heapSpace[4];
        }
    }

    process.on('message', (msg) => {
        if (Array.isArray(msg)) {
            msg.forEach((data) => {
                let handler = collectorHandler[data.type];
                if (typeof handler === 'function') collectorHandler[data.type](data.value);
            });
        }
    });
}

// Bind indicators to socket
function bindSocket(io, indicator) {
    Object.keys(indicator.watch).forEach((key) => {
        let eventName = indicator.watch[key];
        indicator.on(eventName, (msg) => io.emit(eventName, msg));
    });
}

// start http server
server(port, (io, server) => {
    bindIndicators(indicator);
    bindSocket(io, indicator);
});

