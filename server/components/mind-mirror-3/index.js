'use strict';

//var events = require('events');
//var config = require('../../config/environment');

//var serialPort = require("serialport");

/*var comChannel = new events.EventEmitter();
 comChannel.clients = {};
 comChannel.on('connect', function(id){
 console.log("Client connected to COM Channel");

 });
 */

var labelValues = ['38', '30', '24', '19', '15', '12.5', '10.5', '9', '7.5', '6', '4.5', '3', '1.5', '0.75', 'EMG'];


var MM3DataPacket = function (rawPacket) {

  // this.packet = new Uint8Array(255);
  this.packet = rawPacket;
  //console.log('Serial support config: ' + config.serialport.port);

};

MM3DataPacket.prototype.toRawHex = function () {
  return "\nsz: " + this.packet.length + " hex: " + displayFilterRange(this.packet, 0, this.packet.length)
}

MM3DataPacket.prototype.toString = function () {
  var last = this.packet.length;

  if (last < 64) {
    return {
      size: this.packet.length,
      packet: displayFilterRange(this.packet, 0, this.packet.length)
    };
  }

  var l1start = last - 64;
  var r1start = last - 48;
  var l2start = last - 32;
  var r2start = last - 15;

  var lbuff1 = this.packet.slice(l1start, r1start);
  var rbuff1 = this.packet.slice(r1start, l2start);
  var lbuff2 = this.packet.slice(l2start, r2start);
  var rbuff2 = this.packet.slice(r2start, last);


  var response = {
    size: this.packet.length,
    top: displayFilterRange(this.packet, 0, l1start),
    left_data_1: bufferToHex(lbuff1),
    right_data_1: bufferToHex(rbuff1),
    left_data_2: bufferToHex(lbuff2),
    right_data_2: bufferToHex(rbuff2),
    packet: displayFilterRange(this.packet, 0, this.packet.length)
  };
  return response;
}

function bufferToHex(buffer) {
  var result = "";
  for (var x = 0; x < buffer.length; x++) {
    result += decimalToHex(buffer[x]) + " ";
  }
  return result;
}

function displayFilterRange(packet, beginIndex, offset) {
  var result = "";
  if (packet.length < beginIndex || packet.length < beginIndex + offset) {
    return "Packet it only " + packet.length + " bytes long";
  }
  for (var x = beginIndex; x < beginIndex + offset; x++) {
    result += decimalToHex(packet[x]) + " ";
  }
  return result;
}

function decimalToHex(d, padding, base) {
  var radix = typeof (base) === "undefined" || base === null ? base = 16 : base;
  var hex = Number(d).toString(16).toUpperCase();
  padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

  while (hex.length < padding) {
    hex = "0" + hex;
  }
  return hex;
}

MM3DataPacket.prototype.getAsBarGraphData = function () {

  var leftdata = [];
  var rightdata = [];
  var x;

  for(x = 0; x < 15;x++){
    leftdata.push([labelValues[x],-50]);
  }

  for(x = 0; x < 15;x++){
    rightdata.push([labelValues[x],75]);
  }

  return [
    {
      'key': 'left',
      'color': '#d62728',
      values: leftdata
    },
    {
      'key': 'right',
      'color': '#1f77b4',
      values: rightdata
    }
  ];
};

module.exports = MM3DataPacket;
