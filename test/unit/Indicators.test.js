const Indicators = require('../../src/lib/Indicators.js');
const should = require('should');

describe('#Indicators', () => {
    let watcher = { key1: 'hi' };
    let watcherAfter = { key2: 'hello' };
    let indicators;

    it('Add watcher while creating indicators', (done) => {
        indicators = new Indicators(watcher);
        should(indicators.watch).have.properties(watcher);

        indicators.on(indicators.watch.key1, (val) => {
            should(val).equal('hello');
            done();
        });

        indicators.key1 = 'hello';

        should(indicators.key1).equal('hello');
    });

    it('Add watcher after indicators created ', (done) => {
        indicators.setWatcher(watcherAfter);
        should(indicators.watch).have.properties(Object.assign(watcher, watcherAfter));

        indicators.on(indicators.watch.key2, (val) => {
            should(val).equal('hello');
            done();
        });

        indicators.key2 = 'hello';
    });
});
