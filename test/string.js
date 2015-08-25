/**
 * //@by_rcmonitor@//
 * on 25.08.2015.
 */

require('chai').should();

var hpg = require('../index');

describe('string functions', function(){

	describe('#ucfirst() function', function(){

		var arStrings = [
			{
				"incoming": "some string",
				"expected": "Some string"
			},{
				"incoming": " any string",
				"expected": " any string"
			},{
				"incoming": "Moar string",
				"expected": "Moar string"
			}
		];

		var testString = function(strIncoming, strExpected){
			var strConverted = hpg.ucfirst(strIncoming);
			strConverted.should.be.a('string');
			strConverted.should.equals(strExpected);
		};

		it('should make the first letter of a string upper', function(){

			arStrings.forEach(function(oString){
				testString(oString.incoming, oString.expected);
			});
		})
	})
});
