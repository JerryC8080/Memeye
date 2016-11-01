'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

  dashboard: {
    socketServer: {
      port: 1350
    },
    httpServer: {
      port: 1351
    }
  },

  monitor: {
    frequency: 1000,
    process: {
      frequency: 1000
    },
    system: {
      frequency: 1000
    },
    V8: {
      frequency: 1000
    }
  },

  log: {
    level: 'info'
  },

  db: {
    storePath: _path2.default.join(__dirname, '../temp')
  }
}; /*
    * @Author: JerryC (huangjerryc@gmail.com)
    * @Date: 2016-10-31 16:03:33
    * @Last Modified by: JerryC
    * @Last Modified time: 2016-11-01 16:47:25
    * @Description Default options, and these should be configable for user.
    */