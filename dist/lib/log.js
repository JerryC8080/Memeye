'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logMap = {
    'err': 0,
    'warn': 1,
    'info': 2,
    'debug': 3
}; /*
    * @Author: JerryC (huangjerryc@gmail.com)
    * @Date: 2016-10-21 11:34:12
    * @Last Modified by: JerryC
    * @Last Modified time: 2016-11-01 16:49:17
    * @Description
    */

function log(level, message) {
    var levelOption = global.options.log.level;
    if (typeof levelOption === 'string') {
        levelOption = logMap[levelOption];
    }

    var index = logMap[level];

    if (index <= levelOption) {
        console.log(message);
    }
}

exports.default = {
    err: function err(token) {
        return log('err', _chalk2.default.styles.red.open + token + _chalk2.default.styles.red.close);
    },
    warn: function warn(token) {
        return log('warn', _chalk2.default.styles.yellow.open + token + _chalk2.default.styles.yellow.close);
    },
    debug: function debug(token) {
        return log('debug', _chalk2.default.styles.blue.open + token + _chalk2.default.styles.blue.close);
    },
    info: function info(token) {
        return log('info', _chalk2.default.styles.green.open + token + _chalk2.default.styles.green.close);
    }
};