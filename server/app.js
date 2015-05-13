/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.DEBUG  = process.env.NODE_ENV || "app";

var MockSerialProvider = require('./modules/mock-serial-data');
var mockData = new MockSerialProvider('./mm3_capture_raw2');
mockData.connect();

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
require('./modules/socket-server').listen(server,mockData);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
