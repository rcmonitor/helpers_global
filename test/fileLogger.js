/**
 * //@by_rcmonitor@//
 * on 07.03.2015.
 */

var hpg = require('../index.js');
var path = require('path');
require('chai').should();
var fs = require('fs');

var filename = path.join(__dirname, 'log', 'test.log');

var tracedVar = {
	"propOne": 42,
	"propTwo": true,
	"propThree": 'traced property'
};
var strTraceMsg = 'this variable is written over tracing';
var strInfoMsg = 'some first test message';
var strWarnMsg = 'any second msg';
var strErrorMsg = 'more third mess';

function doLog(FileLogger){

	FileLogger.log(tracedVar, strTraceMsg);
	FileLogger.log(strInfoMsg, hpg.FileLogger.levels.info);
	FileLogger.log(strWarnMsg, hpg.FileLogger.levels.warning);
	FileLogger.log(strErrorMsg, hpg.FileLogger.levels.error);
}

describe('testing file logging:', function(){

	beforeEach(function(){

		if(fs.existsSync(filename)){
			fs.unlinkSync(filename);
		}

	});

	afterEach(function(){

		if(fs.existsSync(filename)){
			fs.unlinkSync(filename);
		}

	});

	describe('#log() function of FileLogger class', function(){
		it('should log trace, info, warning and error strings from trace level', function(){

			var fl = new hpg.FileLogger(filename, hpg.FileLogger.levels.trace);

			doLog(fl);
			fl.close();

			var loggedStrings = fs.readFileSync(filename, {"encoding": 'utf8'});

			loggedStrings.should.contain('trace: ');
			loggedStrings.should.contain(strTraceMsg);
			loggedStrings.should.contain('propTwo');
			loggedStrings.should.contain('info: ' + strInfoMsg);
			loggedStrings.should.contain('warning: ' + strWarnMsg);
			loggedStrings.should.contain('error: ' + strErrorMsg);
		});

		it('should only log info, warning and error strings from info level', function(){

			var fl = new hpg.FileLogger(filename);

			doLog(fl);
			fl.close();

			var loggedStrings = fs.readFileSync(filename, {"encoding": 'utf8'});

			loggedStrings.should.not.contain('trace: ');
			loggedStrings.should.not.contain(strTraceMsg);
			loggedStrings.should.not.contain('propTwo');
			loggedStrings.should.contain('info: ' + strInfoMsg);
			loggedStrings.should.contain('warning: ' + strWarnMsg);
			loggedStrings.should.contain('error: ' + strErrorMsg);
		});

		it('should log only warning and error strings from warning log level', function(){
			var strMsg = 'any second string';

			var fl = new hpg.FileLogger(filename, hpg.FileLogger.levels.warning);

			doLog(fl);
			fl.close();

			var loggedStrings = fs.readFileSync(filename, {"encoding": 'utf8'});

			loggedStrings.should.not.contain('trace: ');
			loggedStrings.should.not.contain(strTraceMsg);
			loggedStrings.should.not.contain('propTwo');
			loggedStrings.should.not.contain('info: ' + strInfoMsg);
			loggedStrings.should.contain('warning: ' + strWarnMsg);
			loggedStrings.should.contain('error: ' + strErrorMsg);
		});

		it('should log only error string when invoked on error log-level', function(){
			var strMsg = 'any second string';

			var fl = new hpg.FileLogger(filename, hpg.FileLogger.levels.error);

			doLog(fl);
			fl.close();

			var loggedStrings = fs.readFileSync(filename, {"encoding": 'utf8'});

			loggedStrings.should.not.contain('trace: ');
			loggedStrings.should.not.contain(strTraceMsg);
			loggedStrings.should.not.contain('propTwo');
			loggedStrings.should.not.contain('info: ' + strInfoMsg);
			loggedStrings.should.not.contain('warning: ' + strWarnMsg);
			loggedStrings.should.contain('error: ' + strErrorMsg);
		});

		it('should log nothing and return error each time we`re trying to log', function(){
			var strMsg = 'some log message';

			var fl = new hpg.FileLogger('/a/b/c.txt', FileLogger.levels.trace);
			var strError = fl.error;
			strError.should.be.a('string');
			strError.should.contain('no such file or directory');

			strError = fl.log(strMsg, FileLogger.levels.trace);
			strError.should.be.a('string');
			strError.should.contain('no such file or directory');

			strError = fl.log(strMsg, FileLogger.levels.info);
			strError.should.be.a('string');
			strError.should.contain('no such file or directory');

			strError = fl.log(strMsg, FileLogger.levels.warning);
			strError.should.be.a('string');
			strError.should.contain('no such file or directory');

			strError = fl.log(strMsg, FileLogger.levels.error);
			strError.should.be.a('string');
			strError.should.contain('no such file or directory');
		});
	})
});