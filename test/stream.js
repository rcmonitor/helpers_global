/**
 * //@by_rcmonitor@//
 * on 28.08.2015.
 */

require('chai').should();

var hpg = require('../index');

describe('stream-related tests', function(){

	describe('#createEmptyReadableStream() function', function(){

		var sStream = hpg.createEmptyReadableStream();

		var strExpected = "some damn test string";

		sStream.on('readable', function(){
			var str = sStream.read().toString();

			str.should.equals(strExpected);
		});

		it('should create readable stream', function(fCallback){

			sStream.push(strExpected);
			sStream.push(null);

			sStream.on('end', function(){
				fCallback();
			})

		})
	});
});
