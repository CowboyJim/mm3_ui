'use strict';

var should = require('should');
var MM3 = require('../mind-mirror-3');
//var serialPort = require("serialport");

describe('dummy test', function() {

    var buffer1;
    var mm3;

    before(function() {

        buffer1 = new Uint8Array(10);
        buffer1[0] = 0x05;
        buffer1[1] = 0xAA;
        buffer1[2] = 0x55;
        buffer1[3] = 0xFA;
        buffer1[4] = 0x00;
        buffer1[5] = 0x56;
        buffer1[6] = 0x00;
        buffer1[7] = 0x03;
        buffer1[8] = 0x9E;
        buffer1[9] = 0x00;
        mm3 = new MM3(buffer1);

    });

    describe('Test decode header', function() {
        it("", function() {
            should.exist(buffer1);
            should.exist(mm3);

            console.log("buffer[0]: " + buffer1[0]);
            console.log("buffer[1]: " + buffer1[1]);
            console.log("buffer[2]: " + buffer1[2]);
            console.log("buffer[3]: " + buffer1[3]);
            console.log(mm3.getHeader());

        });

/*        it ("list ports", function() {
            serialPort.list(function(err, ports) {
                ports.forEach(function(port) {
                    console.log(port.comName);
                    console.log(port.pnpId);
                    console.log(port.manufacturer);
                });
            });

        });*/

    });

});
