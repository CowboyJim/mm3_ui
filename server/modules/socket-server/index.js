'use strict';

var socketio = require('socket.io');
var logger = require('winston');
var EventEmitter = require('events').EventEmitter;
var eventEmitter = new EventEmitter();

var io;
var clientNum = 1;
var clientNames = {};
var namesUsed = [];
var CHANNEL_ID = 'commChannel';
var CONNECT_COM = 'connectComm';
var DISCONNECT_COM = 'disconnectComm';

exports.listen = function (server) {

  io = socketio.listen(server);
  io.on('connection', function (socket) {

    logger.log('debug', "A client has connected");
    labelClient(socket);
    notifyClientJointToChannels(socket);
    configureCommandListeners(socket);

  });

  function labelClient(socket) {
    var name = 'client' + clientNum;
    clientNames[socket.id] = name;
    socket.emit('clientID', {name: name, success: true});
    namesUsed.push[name];
    clientNum++;
  }

  function notifyClientJointToChannels(socket) {
    socket.join(CHANNEL_ID);
    socket.emit('joined', {channel: CHANNEL_ID});
    socket.broadcast.to(CHANNEL_ID).emit('message', {
      text: clientNames[socket.id] + 'has joined the channel: ' + CHANNEL_ID
    });

  }

  function configureCommandListeners(socket){
    socket.on('connectComm', function(socket){
      logger.log('debug', "Socket command received: " + CONNECT_COM);
      eventEmitter.emit(CONNECT_COM,{message: 'connect'});
    });

    socket.on('disconnectComm', function(socket){
      logger.log('debug', "Socket command received: " + DISCONNECT_COM);
      eventEmitter.emit(DISCONNECT_COM,{message: 'disconnect'});
    });
  }

  function handleDisconnect(socket) {
    socket.on('disconnect', function () {
      logger.log('debug', " A client has disconnected");

      // TODO remove clients here

    });
  }
};
