/**
 * Created by jim on 3/27/15.
 */

var serialPort = require("serialport")

serialPort.list(function (err, ports) {
  ports.forEach(function(port) {
    console.log(port.comName);
    console.log(port.pnpId);
    console.log(port.manufacturer);
  });
});

return;

var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("/dev/ttyS0", {
  baudrate: 115200
}, false);

// 38400 "/dev/ttys002" 8N1

serialPort.open(function (error) {
  if (error) {
    console.log('failed to open: ' + error);
  } else {
    console.log('open');
    serialPort.on('data', function (data) {
      console.log('data received: ' + data);
    });
    serialPort.write("ls\n\r", function (err, results) {
      console.log('err ' + err);
      console.log('results ' + results);
    });
  }
});
