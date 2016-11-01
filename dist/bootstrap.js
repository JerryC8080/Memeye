'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = bootstrap;

var _options2 = require('./config/options.js');

var _options3 = _interopRequireDefault(_options2);

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

/*
 * @Author: JerryC (huangjerryc@gmail.com)
 * @Date: 2016-10-21 11:37:42
 * @Last Modified by: JerryC
 * @Last Modified time: 2016-11-01 16:36:26
 * @Description
 */

function addMonitor(monitor, worker) {
  var events = monitor.events;

  if (_lodash2.default.isEmpty(events)) {
    return _log2.default.error(monitor.name + ' Monitor no events');
  }

  Object.keys(events).forEach(function (key) {
    var event = events[key];
    _log2.default.debug('[' + bootstrap.js + '] listening:on:' + monitor.name + ':' + event);

    // Handle all event of monitor and send it to worker.
    monitor.on(event, function (data) {
      worker.send({
        name: monitor.name,
        event: event,
        data: data
      });
    });
  });
}

function bootstrap() {
  var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


  // Merge user options.
  var _options = _lodash2.default.merge(_options3.default, opt);

  // Gloable options
  global.options = _options;

  /**
   * For memory isolation we will run worker process here.
   * The master process do:
   *    1. make monitors running.
   *    2. forwarding message from monitor to worker process.
   * The worker process do:
   *    1. make dashboard running.
   *    2. dashboard will have a observer that receiver message from master and distribute to suitable controllers.
   */
  if (_cluster2.default.isMaster) {
    (function () {

      var monitors = [new _monitor.Process(process, _options)];

      // start monitor
      monitors.forEach(function (monitor) {
        return monitor.start();
      });

      // fork worker    
      _log2.default.debug('[bootstrap.js] Strating worker');
      var worker = _cluster2.default.fork();

      // Listeng the change event of process monitor, and send data to worker if it's emitted.
      monitors.forEach(function (monitor) {
        addMonitor(monitor, worker);
      });
    })();
  } else if (_cluster2.default.isWorker) {

    // start dashboard
    _log2.default.debug('[bootstrap.js] Started worker ... ' + _cluster2.default.worker.id);
    (0, _dashboard2.default)(_options);
  }
}