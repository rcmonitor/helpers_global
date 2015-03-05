/**
 * //@by_rcmonitor@//
 * on 05.03.2015.
 */

require('chai').should();

var hpg = require('../index.js');


describe('logger tests', function(){

	describe('#log() function test in return mode', function(){
		it('should return well-formed string', function(){
			var testVar = 'some damn test something';

			var strResult = hpg.log(testVar, 'test var', true);

			strResult.should.contain('string');
			strResult.should.contain('some damn test something');
			strResult.should.contain('test var');

			//console.log(strResult);

		});

		it('should successfully log a number', function(){
			var testVar = 42;
			var strResult = hpg.log(testVar, 'test var', true);
			//console.log(strResult);

			var type = ({}).toString.call(testVar);
			//console.log(type);

			strResult.should.contain('number');
			strResult.should.contain('test var');
			//strResult.should.contain('42');
		});

		it('should successfully log an object', function(){
			var testVar = {
				"first": 'one',
				"second": 'two'
			};

			strResult = hpg.log(testVar, 'test variable', true);

			strResult.should.contain('test variable');
			strResult.should.contain('object');
			strResult.should.contain('first');
			strResult.should.contain('two');
		})
	});

	describe('#log() function test in console output mode', function(){
		it('should output well-formed string to console', function(){
			var testVar = {
				"name": "firs parameter",
				"value": 42,
				"offset": 15
			};

			hpg.log(testVar, 'test variable');
		})
	})
});