'use strict';
const should = require("should");
const processMonitor = require("../../src/monitor/process");    

describe("monitor", () => {
  describe("#process", () => {
    let monitor = new processMonitor(process);
    
    describe("start", () => {
      it("no mProcess params", () => {
        should(monitor.start()).not.ok();
      });
      
      it("should start monitor success", (done) => {
        monitor.start();
        monitor.on('change', (data) => {
          should(data).has.properties(['rss', 'heapTotal', 'heapUsed']);
          done();
        });
      });
      
      it("will be faild when try to starting a started monitor", () => {
        should(monitor.start()).not.ok();        
      });
    });
    
    describe("stop", () => {
      it("should stop the monitor success", () => {
        should(monitor.stop()).be.true();
      });
      
      it("will be faild when try to stop a stoped monitor", () => {
        should(monitor.stop()).not.ok();
      });
    });
  });
});