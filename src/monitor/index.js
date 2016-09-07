'use strict';

const _ = require('lodash');
const log = require('../lib/log');
const monitorClass = {
  'process': require("./Process"),
  'system': require("./System")
}

// TODO 
// Provide defaultConfig for Monitor
// Or may be different sort of monitor has different default config.
const defaultConfig = {};

class Monitor {
  constructor(name, options){
    // Params Check
    if (!name || typeof name !== 'string') {
      throw new Error('The first param must a string of monitor class name.');
    }

    let monitorConstructor = monitorClass[name.toLowerCase()];
    if (!monitorConstructor) {
      throw new Error(`No sort that named ${name} of class`);
    } else {
      return new monitorConstructor(process, _.defaults(defaultConfig, options));
    }
  }
}

module.exports = Monitor;