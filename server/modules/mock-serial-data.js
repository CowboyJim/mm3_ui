'use strict';

var fs = require('fs');
var MM3 = require('../components/mind-mirror-3');
var split = require('split');
var logger = require('winston');
var EventEmitter = require('events').EventEmitter;
var util = require('util');
var stringify = require('json-stringify-safe');

var mm3, buffer;
var bufferArray = [];
//var interval
var that;

var MockSerialProvider = function (filename) {
  this.filename = filename;
  that = this;
  console.log("Filename: " + filename);
  try {
    fs.createReadStream(filename)
      .pipe(split(/\x27/))
      .on('data', function (line) {

        buffer = new Buffer(line, 'binary');
        if (buffer.length === 38) {
          mm3 = new MM3(buffer);
          bufferArray.push(mm3);
         // console.log(mm3.toRawHex());
        } else {
          console.log("Skipping packet of size: " + buffer.length);
        }
      });
  } catch (exception) {
    logger.log('error', exception);
  }
};

util.inherits(MockSerialProvider, EventEmitter);

MockSerialProvider.prototype.connect = function () {
  var counter = 0;
  var interval = setInterval( function() {

   if(bufferArray[counter] instanceof MM3){
      logger.log('debug','Mock Serial: Emit packet');
      that.emit('mm3Packet',bufferArray[counter].getAsBarGraphData());
    }

    if(counter < bufferArray.length - 1){
      counter++;
    } else {
      counter = 0;
    }
  }, 500);

};

MockSerialProvider.prototype.disconnect = function () {
  clearInterval(interval);
};

module.exports = MockSerialProvider;
