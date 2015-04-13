'use strict';

var events = require('events');
var config = require('../../config/environment');

//var serialPort = require("serialport");

var comChannel = new events.EventEmitter();
comChannel.clients = {};
comChannel.on('connect', function(id){
  console.log("Client connected to COM Channel");

});

var MM3DataPacket = function(rawPacket) {

    this.packet = new Uint8Array(255);
  console.log('Serial support config: ' + config.serialport.port);

};

MM3DataPacket.prototype.getHeader = function() {
    return {
        first_byte: "first_byte",
        size: "size",
        checksum: "checksum",
        dll_frame: "dll_frame"
    };
};

module.exports = MM3DataPacket;
