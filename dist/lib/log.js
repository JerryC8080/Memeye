'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    err: function err(token) {
        console.log(_chalk2.default.styles.red.open + token + _chalk2.default.styles.red.close);
    },
    warn: function warn(token) {
        console.log(_chalk2.default.styles.yellow.open + token + _chalk2.default.styles.yellow.close);
    },
    debug: function debug(token) {
        console.log(_chalk2.default.styles.blue.open + token + _chalk2.default.styles.blue.close);
    },
    info: function info(token) {
        console.log(_chalk2.default.styles.green.open + token + _chalk2.default.styles.green.close);
    }
}; /*
    * @Author: JerryC (huangjerryc@gmail.com)
    * @Date: 2016-10-21 11:34:12
    * @Last Modified by:   JerryC
    * @Last Modified time: 2016-10-21 11:34:12
    * @Description
    */