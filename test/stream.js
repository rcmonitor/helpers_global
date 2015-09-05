/**
 * //@by_rcmonitor@//
 * on 28.08.2015.
 */

var chai = require('chai');
chai.should();
var expect = chai.expect;

var hpg = require('../index');

describe('stream-related tests', function(){

	describe('#createEmptyReadableStream() function', function(){

		var sStream = hpg.createEmptyReadableStream();

		var strExpected = "some damn test string";

		var intChunkOffset = 0;

		sStream.on('readable', function(){

			intChunkOffset ++;

			var chunk = sStream.read();
			if(chunk){
				chunk = chunk.toString();
			}

			if(intChunkOffset == 1){
				chunk.should.equals(strExpected);
			}else if(intChunkOffset == 2){
				expect(chunk).to.be.null;
			}
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
