/**
 * Created by jack on 25-Sep-15.
 */
'use strict';

var path = require('path');

var hpg = require(path.join(__dirname, '..', 'index'));
var Trait = hpg.Trait;
var tErroneous = hpg.tErroneous;

describe('trait', function(){

	describe('tErroneous', function(){

		class Some{
			constructor(data){
				this.data = data;
			}
		}

		Some.prototype.doSome = (name, anyParam) => {this.data[name] = anyParam;};

		Some.prototype.doMoar  = () => this.data;

		var oSome = new Some({"first": "string value"});
		tErroneous.useBy(oSome);

		it('should have methods of erroneous trait', function(){

			oSome.should.have.property('addError');
			oSome.should.have.property('hasError');
			oSome.should.have.property('getErrors');

			oSome.should.have.property('errors');

		});

		it('should add errors', function(){
			oSome.addError('first error string');
			oSome.addError(['second error string', 'third error string']);
			oSome.addError(Error('fourth error string'));

			var boolErrors = oSome.hasError();
			boolErrors.should.be.true;

			var arErrors = oSome.getErrors();
			arErrors.should.be.an('array');
			arErrors.should.have.length(4);
			arErrors.should.deep.equals(['first error string'
				, 'second error string'
				, 'third error string'
				, 'fourth error string'
			])
		})
	})
});