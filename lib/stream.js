/**
 * //@by_rcmonitor@//
 * on 28.08.2015.
 */

var SReadable = require('stream').Readable;

var createEmptyReadableStream = function(){
	var sStream = new SReadable();
	sStream._read = function noop(){};

	return sStream;
};


exports.createEmptyReadableStream = createEmptyReadableStream;