/**
 * Created by jack on 05-Sep-15.
 */

var path = require('path');

require('chai').should();

var backtrace = require(path.join(__dirname, '..', 'lib', 'backtrace'));

describe('backtrace tests', function(){

	describe('#backtrace() function', function(){

		it('should return path string', function(){
			var strBacktrace = backtrace(1);

			strBacktrace.should.be.a('string');

			strBacktrace.should.contain('test/backtrace.js');
			strBacktrace.should.contain(': ');
//			console.log(strBacktrace);

		});

		it('should return path string of specified caller', function(){
			var strBacktrace = backtrace(2, 1);
			console.log(strBacktrace);
			strBacktrace.should.contain(': ');
		});

		it('should set depth to 2 when called with zero depth', function(){
			var strBacktrace = backtrace(3, 0);
			strBacktrace.should.contain(': ');
			var arBacktrace = strBacktrace.split('/');
			arBacktrace.should.have.length.of(2);
		})
	})
});