'use strict';

var socketio = require('socket.io');
var logger = require('winston');
var alert = require('mm3-alerts');
var EventEmitter = require('events').EventEmitter;
var eventEmitter = new EventEmitter();

var io;
var clientNum = 1;
var clientNames = {};
var namesUsed = [];
var CHANNEL_ID = 'commChannel';
var CONNECT_COM = 'connectComm';
var DISCONNECT_COM = 'disconnectComm';

exports.listen = function(server, commServer) {

  var self = this;
  this.commlistener = commServer;

  this.io = socketio.listen(server);
  this.io.on('connection', function(socket) {

    logger.log('debug', "A client has connected");

    labelClient(socket);
    notifyClientJointToChannels(socket);
    configureCommandListeners(socket);

  });

  function labelClient(socket) {
    var name = 'client' + clientNum;
    clientNames[socket.id] = name;
    socket.emit('clientID', {
      name: name,
      success: true
    });
    namesUsed.push[name];
    clientNum++;
  }

  function notifyClientJointToChannels(socket) {
    socket.join();
    socket.emit('joined', {
      channel: CHANNEL_ID
    });
    socket.broadcast.emit('message', {
      text: clientNames[socket.id] + 'has joined the channel: ' + CHANNEL_ID
    });
  }

  function configureCommandListeners(socket) {
    socket.on('connectComm', function() {
      logger.log('debug', "Socket command received: " + CONNECT_COM);
      eventEmitter.emit(CONNECT_COM, {
        message: 'connect'
      });
      logger.log('debug', 'mm3Packet listener added');

      var alertState = true;

      self.commlistener.addListener('data', function(data) {
        if (typeof data !== 'undefined') {
          logger.debug("Com packet received. Broadcasting to clients");
          socket.broadcast.emit('mm3Packet', JSON.stringify(data.getAsBarGraphData()));
          socket.broadcast.emit('channelData', JSON.stringify(data.getChannelData()));

          // Fire alert only when state changes
/*          if (alertState !== alert.evaluate(data)) {
            alertState = !alertState;
            socket.broadcast.emit('alert', alertState);
            logger.debug('Alert state changed to: ' + alertState);
          }*/
        }
      });
    });

    socket.on('disconnectComm', function(socket) {
      logger.log('debug', "Socket command received: " + DISCONNECT_COM);
      eventEmitter.emit(DISCONNECT_COM, {
        message: 'disconnect'
      });
      eventEmitter.removeAllListeners('mm3Packet');
    });
  }

  function handleDisconnect(socket) {
    socket.on('disconnect', function() {
      logger.log('debug', " A client has disconnected");
      // TODO remove clients here

    });
  }

};
