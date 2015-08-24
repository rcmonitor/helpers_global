/**
 * //@by_rcmonitor@//
 * on 05.03.2015.
 */

var should = require('chai').should();
var hpg = require('../index.js');


describe('type-related functionality', function(){

	describe('#getType()', function(){
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
	});

	describe('#isEmpty()', function(){

		var vUndefined;
		var vNull = null;

		var arValues = [
			  {"variable": vUndefined, "empty": true}
			, {"variable": vNull, "empty": true}
			, {"variable": "", "empty": true}
			, {"variable": "some string", "empty": false}
			, {"variable": 0, "empty": false}
			, {"variable": 42, "empty": false}
			, {"variable": true, "empty": false}
			, {"variable": false, "empty": false}
			, {"variable": [], "empty": true}
			, {"variable": [1, "some"], "empty": false}
			, {"variable": {}, "empty": true}
			, {"variable": {"some": "value"}, "empty": false}
			, {"variable": function(){return true;}, "empty": false}
		];

		var checkEmpty = function(variable, boolShouldBeEmpty){
			var boolEmpty = hpg.isEmpty(variable);

			boolEmpty.should.be.a('boolean');
			boolEmpty.should.equals(boolShouldBeEmpty);
		};

		it('should determine if variable is empty', function(){
			arValues.forEach(function(item){
				checkEmpty(item.variable, item.empty);
			});
		})
	})
});
