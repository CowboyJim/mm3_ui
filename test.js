'use strict';

var mm3 = require('./server/components/mind-mirror-3');

var buffer1 = new Buffer(10);
buffer1[0] = 0x05;
buffer1[1] = 0xAA;
buffer1[2] = 0x55;
buffer1[3] = 0xFA;
buffer1[4] = 0xff;
buffer1[5] = 0x56;
buffer1[6] = 0x93;
buffer1[7] = 0x03;
buffer1[8] = 0x9E;
buffer1[9] = 0x00;

var mm3Event =  new mm3(buffer1);

console.log(mm3Event.toString());

/*
 packet_size: this.packet[1] ,
 frame_num: this.packet[4],
 attunation: this.packet[6],

 */
