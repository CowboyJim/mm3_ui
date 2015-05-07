'use strict';

var fs = require('fs');
var MM3 = require('../components/mind-mirror-3');
var split = require('split');
var EventEmitter = require(‘events’).EventEmitter;
var util = require(‘util’);


var mm3, buffer;
var bufferArray = [];
var interval

var MockSerialProvider = function (filename) {
  this.filename = filename;
  console.log("Filename: " + filename);
  init(filename);
};

function init(filename) {
  try {
    fs.createReadStream(filename)
      .pipe(split(/\x27/))
      .on('data', function (line) {

        buffer = new Buffer(line, 'binary');
        if (buffer.length === 38) {
          mm3 = new MM3(buffer);
          bufferArray.push(mm3);
          console.log(mm3.toRawHex());
        } else {
          console.log("Skipping packet of size: " + buffer.length);
        }
      });
  } catch (exception) {
    console.log(exception);

  }
}

MockSerialProvider.prototype.connect = function () {
  var counter = 0;
  var interval = setInterval( function() {
    console.log("Index: " + counter + " : " + bufferArray[counter].toRawHex());
    if(counter < bufferArray.length){
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
