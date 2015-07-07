/**
 * Created by jim on 6/2/15.
 */


//var mm3Packet = require('mm3_packet');
var EventEmitter = require('events').EventEmitter;
var eventEmitter = new EventEmitter();

var _gAlertName = "alert_1";

var Alert1 = function (packetEmitter) {
  this.self = this;

  packetEmitter.addListener('data', function (data) {
    if (typeof data !== 'undefined') {
      logger.debug("Com packet received. Broadcasting to clients");

      this.evaluate(data);

    }
  });
};

Alert1.prototype.evaluate =  function(packet) {

  var L = packet.getLeftFrequencyValue('L');
  var Y = packet.getRightFrequencyValue('Y');

  if (isLeftPeaked(L) && !isRightPeaked(Y)) {
    fire();
  }
};

function isLeftPeaked(value) {

  if (value > packet.getLeftFrequencyValue('K') && value > packet.getLeftFrequencyValue('M')) {
    return true;
  }
  return false;
}

function isRightPeaked(value) {

  if (value > packet.getRightFrequencyValue('X') && value > packet.getRightFrequencyValue('Z')) {
    return true;
  }
  return false;
}

//function saveAroundValues() {
//  this.lastL_around.K = packet.getLeftFrequencyValue('K');
//  this.lastL_around.M = packet.getLeftFrequencyValue('M');
//  this.lastY_around.X = packet.getRightFrequencyValue('X');
//  this.lastY_around.Z = packet.getRightFrequencyValue('Z');
//}

function fire() {
  eventEmitter.emit(_gAlertName, true);
}

module.exports = Alert1;
