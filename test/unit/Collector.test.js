const Collector = require('../../src/lib/Collector.js');
const should = require('should');
const events = require('events');
const v8 = require('v8');
const os = require('os');

describe('#Collector', () => {
    let frequency = 50;
    let dashboard = new events.EventEmitter();
    dashboard.send = (val) => { dashboard.emit('send', val) }
    dashboard.connected = true;

    let collector = new Collector(dashboard, { frequency });

    it('start a collector', (done) => {
        let callDone = false;
        let indicatorsStructure = {
            process: process.memoryUsage(),
            v8: {
                heap: v8.getHeapStatistics(),
                heapSpace: v8.getHeapSpaceStatistics(),
            },
            os: {
                freeMem: os.freemem(),
                totalMem: os.totalmem(),
                cpus: os.cpus(),
            }
        }

        // mutil call start() should be nothing affect;
        collector.start();
        collector.start();

        dashboard.on('send', (val) => {
            should(val).is.Array();
            val.forEach((item) => {
                let indicators = indicatorsStructure[item.type];
                should(item.value).has.properties(Object.keys(indicators));
            });
            if (!callDone) {
                callDone = true;
                done();
            }
        });
    });

    it('stop a collector', (done) => {
        let callDone = false;

        collector.stop();
        dashboard.on('send', (val) => {
            if (!callDone) {
                callDone = true;
                done('collector have not stop');
            }
        });

        setTimeout(function () {
            done();
        }, frequency * 3);
    })
});