/**
 * Created by jack on 25-Sep-15.
 */
'use strict';

var path = require('path');

var hpg = require(path.join(__dirname, '..', 'index'));
var Trait = hpg.Trait;
var tErroneous = hpg.tErroneous;

describe('trait', function(){

	class Some{
		constructor(data){
			this.data = data;
		}
	}

	Some.prototype.doSome = (name, anyParam) => {this.data[name] = anyParam;};

	Some.prototype.doMoar  = () => this.data;

	describe('tErroneous', function(){

		it('should have methods of erroneous trait', function(){
			var oSome = new Some({"first": "string value"});
			tErroneous.useBy(oSome);

			oSome.should.have.property('addError');
			oSome.should.have.property('hasError');
			oSome.should.have.property('getErrors');

			oSome.should.have.property('errors');

		});

		it('should add errors', function(){
			var oSome = new Some({"first": "string value"});
			tErroneous.useBy(oSome);

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
		});

		it('how to add trait to class instead of object', function(){
			tErroneous.useBy(Some);
			var oSome = new Some({"first": "string"});

			oSome.addError('first error');
			var boolError = oSome.hasError();
			boolError.should.be.true;
		});
	});

	describe('another take to behave class', function(){

		var extend = function(someClass, functionName, someFunction){

			var strType = hpg.getType(someClass);
			strType.should.equals('function');

			someClass.prototype[functionName] = someFunction;
		};

		it('should extend class with given function', function(){

			extend(Some, 'setError', function(error){
				this.errors = [];
				this.errors.push(error);
			});

			var oSome = new Some({"any": "data"});
			oSome.setError('first error');
			oSome.errors.should.be.an('array');
			oSome.errors.should.have.length(1);
			oSome.errors.should.deep.equals(['first error']);
		})

	})
});