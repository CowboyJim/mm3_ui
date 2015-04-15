'use strict';
var MM3 = require('./server/components/mind-mirror-3');
var SerialPort = require('serialport').SerialPort;
var serialport = new SerialPort("com1", {
  baudrate: 9600,
  stopbits: 1,
  parity: 'none',
//  bufferSize: 255
}, false);

serialport.open(function (error) {
	var mm3;

  if (error) {
    console.log("Failed to connect to COM1: " + error);
    return;
  }
  console.log("Successfully connected to COM1");
  serialport.on('data', function (data) {
  	//mm3 = new MM3(data);
  	//console.log(data.length + " : " + data.toString('utf8'));
  	console.log(data.length);
	console.log(data);
	  	
  	//console.log(mm3.toString());
    //printHex1(data);
  });
  serialport.on('close', function (data) {
    console.log("Close event received: " + data);
  });
  serialport.on('error', function (error) {
    console.log("Error event received: " + error);
  });
});


function printHex1(buffer) {
  var offsetLength = buffer.length.toString(16).length;
  var last = buffer.length % 16 || 16
  var b = 0;
  var lastBytes;
  var lastSpaces;
  var v, i;
  var rows = 1;
  var str = Date.now() / 100 | 0;

  for (i = 0; i < rows; i++) {
    // str += '\u001b[36m' + zero(b, offsetLength) + '\u001b[0m  ';
    lastBytes = i === rows - 1 ? last : 16;
    lastSpaces = 16 - lastBytes;

    var j;
    for (j = 0; j < lastBytes; j++) {
      str += ' ' + zero(buffer[b], 2);
      b++;
    }

    for (j = 0; j < lastSpaces; j++) {
      str += '   ';
    }

    b -= lastBytes;
    str += '   ';

    for (j = 0; j < lastBytes; j++) {
      v = buffer[b];
      str += (v > 31 && v < 127) || v > 159 ? String.fromCharCode(v) : '.';
      b++;
    }

    str += '\n';
  }

  process.stdout.write(str);

};

var zero = function (n, max) {
  n = n.toString(16).toUpperCase();
  while (n.length < max) {
    n = '0' + n;
  }
  return n;
};
