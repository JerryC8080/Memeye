'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.System = exports.Process = undefined;

var _Process = require('./Process');

var _Process2 = _interopRequireDefault(_Process);

var _System = require('./System');

var _System2 = _interopRequireDefault(_System);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * @Author: JerryC (huangjerryc@gmail.com)
 * @Date: 2016-10-21 11:26:27
 * @Last Modified by: JerryC
 * @Last Modified time: 2016-10-21 11:33:20
 * @Description
 * 
 * How to use this module
 * 
 * import {Process, System} from 'monitor';
 * const ProcessMonitor = new Process(process, options);
 * const SystemMonitor = new System(process, options);
 * 
 * ProcessMonitor.start()
 * ProcessMonitor.on('change', () => { // do logic });
 * 
 */

exports.Process = _Process2.default;
exports.System = _System2.default;