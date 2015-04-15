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
var MM3DataPacket = function(rawPacket) {

    // this.packet = new Uint8Array(255);
  this.packet = rawPacket;
    //console.log('Serial support config: ' + config.serialport.port);

};

MM3DataPacket.prototype.getHeader = function() {
    return {
        first_byte: "first_byte",
        size: "size",
        checksum: "checksum",
        dll_frame: "dll_frame"
    };
};

MM3DataPacket.prototype.toString = function() {
  return {
    packet_size: decimalToHex(this.packet[1]) ,
    frame_num: decimalToHex(this.packet[4]),
    attenunation: decimalToHex(this.packet[6]),
    timestamp:  decimalToHex(this.packet[7]) + decimalToHex(this.packet[8]),
    left_emg: decimalToHex(this.packet[9]),
    left_data: displayFilterRange(this.packet,10,14),
    right_emg: decimalToHex(this.packet[24]),
    right_data: displayFilterRange(this.packet,25,14)
  };
};

function displayFilterRange(packet,beginIndex, offset){
  var result;
  if(packet.length < beginIndex || packet.length < beginIndex + offset){
    return "Packet it only " + packet.length + " bytes long";
  }
  for(var x = beginIndex; x < beginIndex + offset; x++){
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



module.exports = MM3DataPacket;
