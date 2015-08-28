/**
 * //@by_rcmonitor@//
 * on 28.08.2015.
 */

require('chai').should();

var hpg = require('../index');

describe('object module tests', function(){

	describe('#extend() function', function(){

		var oRecipient = {
			"first": 1,
			"second": '2',
			"third": "three",
			"fourth": {
				"value": 4
			}
		};
		var oDonor = {
			"second": "two",
			"third": {
				value: 3
			},
			"fourth": {
				"attribute": {
					"some": "data"
				}
			}
		};

		var oExpected = {
			"first": 1,
			"second": "two",
			"third": {
				"value": 3
			},
			"fourth": {
				"value": 4,
				"attribute": {
					"some": "data"
				}
			}
		};

		it('should traverse properties from donor to recipient', function(){
			hpg.extend(oRecipient, oDonor);

			oRecipient.should.eql(oExpected);
		})
	})
});
