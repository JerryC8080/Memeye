/**
 * Indicators like a state machine.
 * When attribute changed, indicators instance will emit an event.
 * You can listen the event then do your logic.
 */

const events = require('events');
const util = require('util');

// Conctructor
function Indicators(indicators) {
    events.EventEmitter.call(this);

    // Define watch object.
    this.watch = {};
    Object.assign(this.watch, indicators);

    // Set watcher
    this.setWatcher.call(this, indicators);
}

// Inherit EventEmitter Class
util.inherits(Indicators, events.EventEmitter);

// Set watcher, it aslo support dynamic adding.
Indicators.prototype.setWatcher = function setWatcher(indicators) {
    let propDefine = {};
    let that = this;

    // Define setter/getter for indicators
    Object.keys(indicators).forEach((key) => {
        that.watch[key] = indicators[key];
        propDefine[key] = {
            set: function (value) {
                this.emit(indicators[key], value);
                this['_' + key] = value;
            },
            get: function () {
                return this['_' + key];
            },
            enumerable: true,
        }
    });

    Object.defineProperties(that, propDefine);
}

module.exports = Indicators;