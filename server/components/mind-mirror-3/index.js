'use strict';

var MM3DataPacket = function(rawPacket) {

    this.packet = new Uint8Array(255);
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