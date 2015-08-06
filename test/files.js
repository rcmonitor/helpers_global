/**
 * //@by_rcmonitor@//
 * on 03.08.2015.
 */

var hpg = require('../index.js');
var fs = require('fs');
var path = require('path');

var oPaths = {
	"relative": './test/data/relative.test'
	, "absolute": __dirname + path.sep + 'data' + path.sep + 'absolute.test'
	, "resolved": path.join(__dirname, 'data') + 'resolved.test'
	, "wrong": '/a/b/c/wrong.test'
};

describe('filesystem-related tests', function(){

	beforeEach(function(){
		for(strProperty in oPaths){
			if(fs.existsSync(oPaths[strProperty])){
				fs.unlinkSync(oPaths[strProperty]);
				//console.log(oPaths[strProperty] + ' unlinked before');
			}
		}
	});

	afterEach(function(){
		for(strProperty in oPaths){
			if(fs.existsSync(oPaths[strProperty])){
				fs.unlinkSync(oPaths[strProperty]);
				//console.log(oPaths[strProperty] + ' unlinked after');
			}
		}
	});

	describe('#ensureFileExistsSync() test', function(){
		it('should create file in data directory with relative path', function(){
			hpg.ensureFileExistsSync(oPaths.relative);

			var boolCreated = fs.existsSync(oPaths.relative);
			boolCreated.should.be.a('boolean');
			boolCreated.should.equals(true);
		});
		it('should create file in data directory with absolute path', function(){
			hpg.ensureFileExistsSync(oPaths.absolute);

			var boolCreated = fs.existsSync(oPaths.absolute);
			boolCreated.should.be.a('boolean');
			boolCreated.should.equals(true);
		});
		it('should create file in data directory with resolved path', function(){
			hpg.ensureFileExistsSync(oPaths.resolved);

			var boolCreated = fs.existsSync(oPaths.resolved);
			boolCreated.should.be.a('boolean');
			boolCreated.should.equals(true);
		});
		it('should not create file in data directory with wrong path', function(){

			var oErroneous = {};

			hpg.ensureFileExistsSync(oPaths.wrong, 'a', oErroneous);

			var boolCreated = fs.existsSync(oPaths.wrong);
			boolCreated.should.be.a('boolean');
			boolCreated.should.equals(false);

			oErroneous.should.have.property('errors');
			oErroneous.errors.should.be.an('array');
			oErroneous.errors[0].should.be.a('string');
			oErroneous.errors[0].should.not.be.empty;
		});
	});


	describe('#ensureFileNotExistsSync() function tests', function(){
		
		var arCorrectPaths = [
			'./test/data/relative.test'
			, __dirname + path.sep + 'data' + path.sep + 'absolute.test'
			, path.join(__dirname, 'data') + 'resolved.test'
		];
		
		var testSuccessfulDeletion = function(strPath){
			hpg.ensureFileExistsSync(strPath);

			var boolDeleted = hpg.ensureFileNotExistsSync(strPath);
			boolDeleted.should.be.a('boolean');
			boolDeleted.should.equals(true);

			var boolExists = fs.existsSync(strPath);
			boolExists.should.be.a('boolean');
			boolExists.should.equals(false);
		};

		arCorrectPaths.forEach(function(strPath){
			it('should successfully delete file', function(){
				testSuccessfulDeletion(strPath);
			})
		});


		var arIncorrectPaths = [
			'/a/b/c/wrong.test'
		];

		var testNoDeletion = function(strPath){
			hpg.ensureFileExistsSync(strPath);

			var boolDeleted = hpg.ensureFileNotExistsSync(strPath);
			boolDeleted.should.be.a('boolean');
			boolDeleted.should.equals(false);

			var boolExists = fs.existsSync(strPath);
			boolExists.should.be.a('boolean');
			boolExists.should.equals(false);
		};

		arIncorrectPaths.forEach(function(strPath){
			it('should not delete inexistent file', function(){
				testNoDeletion(strPath);
			});
		});

	});
});
