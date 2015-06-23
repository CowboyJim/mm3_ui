#!/bin/bash


export NODE_ENV="production"
#export MM3_PORT="/dev/ttyUSB0"
export MM3_PORT="/dev/ttyS0"
node server/app.js