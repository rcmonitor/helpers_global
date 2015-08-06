/**
 * //@by_rcmonitor@//
 * on 06.08.2015.
 */

var fs = require('fs');
var files = require('../lib/files');

describe('directory tests', function(){

	describe('#ensureDirectoryExistsSync() function tests', function(){

		var strDirectoryPath = './testDir';
		if(fs.existsSync(strDirectoryPath)){
			fs.rmdirSync(strDirectoryPath);
		}

		it('should successfully create inexistent directory', function(){
			var boolCreated = files.ensureDirectoryExistsSync(strDirectoryPath);
			boolCreated.should.be.a('boolean');
			boolCreated.should.be.true;

			var boolReallyCreated = fs.existsSync(strDirectoryPath);
			boolReallyCreated.should.be.true;
		});


		it('should not create lousy directory', function(){
			var strWrongDirectoryPath = '/a/b/c';

			var oErroneous = {};

			var boolCreated = files.ensureDirectoryExistsSync(strWrongDirectoryPath, oErroneous);

			boolCreated.should.be.a('boolean');
			boolCreated.should.be.false;

			oErroneous.should.have.property('errors');
			oErroneous.errors.should.be.an('array');
			oErroneous.errors.should.not.be.empty;
			oErroneous.errors[0].should.be.a('string');
			oErroneous.errors[0].should.not.be.empty;

		})
	});
});
