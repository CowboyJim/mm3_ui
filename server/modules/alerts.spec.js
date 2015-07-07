/**
 * Created by jim on 6/3/15.
 */

'use strict';
var Alert1 = require('server/modules/alerts');
var expect = require("chai").expect;
var EventEmitter = require('events').EventEmitter;
var Mm3Packet = require('../../mm3_packet');


var noFirePacket = [0x05, 0x27, 0x93, 0x04, 0x00, 0x04, 0x00, 0x00, 0x00, 0x03, 0x1C, 0x60, 0x9A,
  0xB3, 0xCC, 0xE9, 0xFF, 0xFF, 0xF1, 0xD8, 0xBF, 0x9A, 0x60, 0x19, 0x03, 0x1C, 0x60, 0x9A, 0xB3,
  0xCC, 0xE9, 0xFF, 0xFF, 0xF1, 0xD8, 0xBF, 0x9A, 0x60, 0x19];

var leftFirePacket = [0x05, 0x27, 0x93, 0x04, 0x00, 0x04, 0x00, 0x00, 0x00, 0x03, 0x1C, 0x60, 0x9A,
  0xB3, 0xCC, 0xE9, 0xFF, 0xFF, 0xF1, 0xD8, 0xBF, 0x9A, 0x60, 0x19, 0x03, 0x1C, 0x60, 0x9A, 0xB3,
  0xCC, 0xE9, 0xFF, 0xFF, 0xF1, 0xD8, 0xBF, 0x9A, 0x60, 0x19];

var rightFirePacket = [0x05, 0x27, 0x93, 0x04, 0x00, 0x04, 0x00, 0x00, 0x00, 0x03, 0x1C, 0x60, 0x9A,
  0xB3, 0xCC, 0xE9, 0xFF, 0xFF, 0xF1, 0xD8, 0xBF, 0x9A, 0x60, 0x19, 0x03, 0x1C, 0x60, 0x9A, 0xB3,
  0xCC, 0xE9, 0xFF, 0xFF, 0xF1, 0xD8, 0xBF, 0x9A, 0x60, 0x19];

describe('Alerts test', function () {

  var eventEmitter;
  var alerts;

  before(function () {
    eventEmitter = new EventEmitter();
    alerts = new Alert1(eventEmitter);
  });

  describe('Test alert1', function (done) {
    it('it should work', function (done) {


      eventEmitter.addListener('alert_1', function (fired) {
        console.log("event fired");
        done();
      })

      alerts.evaluate(new Mm3Packet(noFirePacket));




    });

  });
});

