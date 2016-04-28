'use strict';

module.exports = {
  processMemoryUsage: {
    name: 'ProcessMemoryUsage',
    events: {
      init: 'ProcessMemoryUsage:init',
      addPoint: 'ProcessMemoryUsage:addPoint'
    },
    options: {
      chart: {
        renderTo: 'process-memory-usage'
      },

      rangeSelector: {
        allButtonsEnabled: true, 
        selected: 1,
        buttons: [
          {type: 'second', count: 1, text: 'second'},
          {type: 'minute', count: 1, text: 'minute'},
          {type: 'minute', count: 60, text: 'hour'}      
        ]
      },
      
      xAxis: {
        type: 'datetime',
        minRange: 2 * 30 * 1000
      },

      title: {
        text: 'Process Memory Usage'
      },

      series: [{
        name: 'rss',
        data: []
      },{
        name: 'heapUsed',
        data: []
      }, {
        name: 'heapTotal',
        data: []
      }]
    }
  }
}