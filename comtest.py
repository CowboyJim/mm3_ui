#!/usr/bin/python

import serial
import time

ser = serial.Serial(
    port='/dev/ttyS0',\
    baudrate=9600,\
    parity=serial.PARITY_NONE,\
    stopbits=serial.STOPBITS_ONE,\
    bytesize=serial.EIGHTBITS,\
        timeout=0.5)

print("connected to: " + ser.portstr)
#this will store the line

try:
	while True:
		header = ser.readline()
		#for x in range(len(header)):
		#	print(header[x].encode('hex'))
		print(':'.join(x.encode('hex') for x in header))
			#print(bytes(header))
		print(time.time())
		print(len(header))
		print('----------------------------------')

finally:
	ser.close()