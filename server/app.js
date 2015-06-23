/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.DEBUG  = process.env.NODE_ENV || "app";

var portId = process.env.MM3_PORT || '/dev/tty.usbserial';

// Import the MindMirror3 module and connect to the COM port
var MM3 = require('mind-mirror3').MindMirror3;

var mm3 = new MM3();
mm3.connectTo(portId).open();


var express = require('express');
var config = require('./config/environment');
// Setup server
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

var logger = require('winston');
logger.level='debug';

// Load the socket server
require('./modules/socket-server').listen(server,mm3);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
