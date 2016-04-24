'use strict';
let path = require("path");
const assetsDir = path.join(__dirname, './assets');

module.exports = function (grunt) {
  grunt.initConfig({
    'http-server': {
      'dev': {
        root: assetsDir,
        port: 8282,
        host: '127.0.0.1',
        showDir:true,
        autoIndex: true,
        ext: 'html'
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-http-server');
}