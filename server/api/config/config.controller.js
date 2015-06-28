'use strict';

var _ = require('lodash');

// Get list of configs
exports.index = function (req, res) {

  var response = {'com': '/dev/tty.usbserial'};

  res.json(response);
};
