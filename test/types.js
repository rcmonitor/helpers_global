/**
 * //@by_rcmonitor@//
 * on 05.03.2015.
 */

var should = require('chai').should();
var hpg = require('../index.js');


describe('tests getting of types by common helper', function(){

	describe('#getType() test', function(){
		it('should correctly get type of a number', function(){
			var testVar = 15;
			var strType = hpg.getType(testVar);

			strType.should.be.equal('number');
		});

		it('should correctly get type of an object', function(){
			var testVar = {
				"some": 'any',
				"more": 48
			};
			var strType = hpg.getType(testVar);

			strType.should.be.equal('object');
		})
	})
});
