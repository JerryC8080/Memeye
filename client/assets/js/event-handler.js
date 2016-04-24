  var socket = io('http://127.0.0.1:1339');
  socket.on('HeapUsed:addPoint', function(data){
    console.log(data);
  });

  socket.on('Global:init', function (data) {
    console.log(data);
  })