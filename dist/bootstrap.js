'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = bootstrap;

var _cluster = require('cluster');

var _cluster2 = _interopRequireDefault(_cluster);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _log = require('./lib/log');

var _log2 = _interopRequireDefault(_log);

var _monitor = require('./monitor');

var _dashboard = require('./dashboard');

var _dashboard2 = _interopRequireDefault(_dashboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addMonitor(monitor, worker) {
  var events = monitor.events;

  if (_lodash2.default.isEmpty(events)) {
    return _log2.default.error(monitor.name + ' Monitor no events');
  }

  Object.keys(events).forEach(function (key) {
    var event = events[key];
    _log2.default.debug('listening:on:' + monitor.name + ':' + event);

    // Handle all event of monitor and send it to worker.
    monitor.on(event, function (data) {
      worker.send({
        name: monitor.name,
        event: event,
        data: data
      });
    });
  });
} /*
   * @Author: JerryC (huangjerryc@gmail.com)
   * @Date: 2016-10-21 11:37:42
   * @Last Modified by: JerryC
   * @Last Modified time: 2016-10-21 16:48:19
   * @Description
   */

function bootstrap(options) {

  if (_cluster2.default.isMaster) {
    (function () {

      var monitors = [new _monitor.Process(process, options)];

      // start monitor
      monitors.forEach(function (monitor) {
        return monitor.start();
      });

      // fork worker    
      _log2.default.debug('Strating worker');
      var worker = _cluster2.default.fork();

      // Listeng the change event of process monitor, and send data to worker if it's emitted.
      monitors.forEach(function (monitor) {
        addMonitor(monitor, worker);
      });
    })();
  } else if (_cluster2.default.isWorker) {
    // start dashboard
    _log2.default.debug('Started worker ... ' + _cluster2.default.worker.id);
    (0, _dashboard2.default)();
  }
}