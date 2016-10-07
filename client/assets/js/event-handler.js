var socket = io('http://127.0.0.1:1339');

Highcharts.setOptions({
  global: {
    useUTC: false
  }
});

socket.on('ProcessMemoryUsage:init', function (options) {
  console.log(options);
  window.processMemUsage = new Highcharts.StockChart(options)
});

socket.on('ProcessMemoryUsage:addPoint', function (data) {
  console.log(data);
  window.processMemUsage.series[0].addPoint(data[0]);
  window.processMemUsage.series[1].addPoint(data[1]);
  window.processMemUsage.series[2].addPoint(data[2]);

})
