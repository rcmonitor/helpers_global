/**
 * //@by_rcmonitor@//
 * on 06.08.2015.
 */

var fs = require('fs');
var path = require('path');
require('chai').should();

var Configurator = require('../index.js').Configurator;

var logFilePath = path.join(__dirname, 'log', 'test.log');

describe('configurator test', function(){

	beforeEach(function(){
		if(fs.existsSync(logFilePath)){
			fs.unlinkSync(logFilePath);
		}
	});

	afterEach(function(){
		if(fs.existsSync(logFilePath)){
			fs.unlinkSync(logFilePath);
		}
	});

	describe('basic configuration test', function(){

		it('should create log file and load configuration file', function(){
			var oConfig = new Configurator(__dirname, 'test');

			var boolConfigCreated = fs.existsSync(logFilePath);
			boolConfigCreated.should.be.a('boolean');
			boolConfigCreated.should.be.true;

			oConfig.should.have.property('fileLogger');

			oConfig.should.have.property('config');
			oConfig.config.should.have.property('some', 'any');

			oConfig.fileLogger.close();
		});
	});
});