'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _log = require('../lib/log');

var _log2 = _interopRequireDefault(_log);

var _Monitor2 = require('./Monitor');

var _Monitor3 = _interopRequireDefault(_Monitor2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Author: JerryC (huangjerryc@gmail.com)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Date: 2016-10-21 11:20:45
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Last Modified by: JerryC
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Last Modified time: 2016-10-21 17:29:48
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Description
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Process = function (_Monitor) {
  _inherits(Process, _Monitor);

  function Process(mProcess, options) {
    _classCallCheck(this, Process);

    // TODO Use ES6 Symbol
    var _this2 = _possibleConstructorReturn(this, (Process.__proto__ || Object.getPrototypeOf(Process)).call(this));

    _this2.name = 'process';

    // The process need to monitor, it's likly the current node process.
    _this2.mProcess = mProcess;

    // Interval Instance of `setInterval` method. It is use to stop moniting.
    _this2.intervalInstance = null;

    // Events the Process monitor provider. 
    _this2.events = {
      CHANGE: 'change'
    };
    return _this2;
  }

  /**
   * Running a monitor for the master process.
   */


  _createClass(Process, [{
    key: 'start',
    value: function start() {
      var _this = this;
      var mProcess = _this.mProcess;

      if (!mProcess) {
        throw new Error('Starting a monitor faild, casue attempt to listenning to an nonexistent process.');
      }

      if (_this.intervalInstance) {
        throw new Error('The monitor are listenning a process now, you should stop it at first.');
      }

      // Emit `change` event per 1 second.
      // And the outside should listen this event such as: `processMonitor.on('message', (usage) = {...} )`
      _this.intervalInstance = setInterval(function () {
        var data = mProcess.memoryUsage();
        _log2.default.debug('[monitor/Process.js] process:emit:change:' + JSON.stringify(data));
        _this.emit(_this.events.CHANGE, data);
      }, 1000); // TODO allow configing interval time
    }

    /**
     * Stop the monitor
     */

  }, {
    key: 'stop',
    value: function stop() {
      var _this = this;

      if (!_this.intervalInstance) {
        throw new Error('This monitor did not running, make sure you has been started the monitor');
      }

      clearInterval(_this.intervalInstance);

      _this.intervalInstance = null;

      _log2.default.info('An Process monitor has been stoped.');

      return true;
    }
  }]);

  return Process;
}(_Monitor3.default);

exports.default = Process;