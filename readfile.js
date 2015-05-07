var fs = require('fs');
var lineReader = require('line-reader');
var MM3 = require('./server/components/mind-mirror-3');
var split = require('split');

var PLL_SYNC_MASK = 0x0f; /*0,1,2,3,0,... */
var PLL_SYNC_1010 = 0x0A;
var PLL_SYNC_0101 = 0x05;

var fileName = process.argv.splice(2);

console.log("File Name: " + fileName[0]);

var mm3, buffer;

  fs.createReadStream(fileName[0])
    .pipe(split(/\x27/))
    .on('data', function (line) {

	buffer = new Buffer(line,'binary');
  	mm3 = new MM3(buffer);
	//console.log(mm3.toString());
	console.log(mm3.toRawHex());

    });

return;

lineReader.eachLine(fileName[0], function(line){

	buffer = new Buffer(line,'binary');
  	mm3 = new MM3(buffer);
	//console.log(mm3.toString());
	console.log(mm3.toRawHex());

}).then(function(){

	console.log('Done');
});


//////// Look at split npm on '02 0a'

return;



var fileBuffer = fs.readFileSync(fileName[0]);

console.log(fileBuffer);

for(var x = 0; x < fileBuffer.length; x++){

	//console.log(toHex(fileBuffer[x]));

	var a = findSync(fileBuffer[x], PLL_SYNC_1010);
	var b = findSync(fileBuffer[x], PLL_SYNC_0101);

	if( a !== 0 ) {
		//console.log("Sync 1010: " + toHex(fileBuffer[x] & PLL_SYNC_MASK));
		console.log(toHex(a));
		//console.log("Payload size: " + toHex(fileBuffer[x + 1]));
	} else if( b !== 0 ) {
		console.log(toHex(b));
		//console.log("Sync 0101: " + toHex(fileBuffer[x] & PLL_SYNC_MASK));
		//console.log("Payload size: " + toHex(fileBuffer[x + 1]));		
	}
	
}

console.log("File size: " + fileBuffer.length);



function findSync(data, mask){
	//console.log ("Sync: "  +  (data & PLL_SYNC_MASK) & mask) ;
  return  (data & PLL_SYNC_MASK) & mask;
}

/*
function toHex(byte){
	if(typeof byte != 'undefined'){
		return byte.toString(16);		
	} else {
		return 'undefined';
	}
}
*/
function toHex(d, padding) {
    var hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

    while (hex.length < padding) {
        hex = "0" + hex;
    }

    return '0x' + hex;
}
