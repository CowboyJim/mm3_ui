'use strict';

var socketio = require('socket.io');
var io;
var numberOfClients;

exports.listen = function (server) {

  io = socketio.listen(server);
  io.on('connection', function (socket) {
    console.log("A browser has connected");


  });

};
