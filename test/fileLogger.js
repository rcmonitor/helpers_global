/**
 * //@by_rcmonitor@//
 * on 07.03.2015.
 */

var hpg = require('../index.js');
var path = require('path');
var should = require('chai').should();
var fs = require('fs');

var filename = path.join(__dirname, 'log', 'test.log');
hpg.log(filename, 'filename');
//var fl = new hpg.fileLogger(filename);

var tracedVar = {
	"propOne": 42,
	"propTwo": true,
	"propThree": 'traced property'
};
var strTraceMsg = 'this variable is written over tracing';
var strInfoMsg = 'some first test message';
var strWarnMsg = 'any second msg';
var strErrorMsg = 'more third mess';

function doLog(fileLogger){

	fileLogger.log(tracedVar, strTraceMsg);
	fileLogger.log(strInfoMsg, hpg.fileLogger.levels.info);
	fileLogger.log(strWarnMsg, hpg.fileLogger.levels.warning);
	fileLogger.log(strErrorMsg, hpg.fileLogger.levels.error);
};

describe('testing file logging:', function(){

	beforeEach(function(){

		if(fs.existsSync(filename)){
			fs.unlinkSync(filename);
		}

	});

	describe('#log() function of fileLogger class', function(){
		it('should log trace, info, warning and error strings from trace level', function(){

			var fl = new hpg.fileLogger(filename, hpg.fileLogger.levels.trace);

			doLog(fl);

			var loggedStrings = fs.readFileSync(filename, {"encoding": 'utf8'});

			loggedStrings.should.contain('trace: ');
			loggedStrings.should.contain(strTraceMsg);
			loggedStrings.should.contain('propTwo');
			loggedStrings.should.contain('info: ' + strInfoMsg);
			loggedStrings.should.contain('warning: ' + strWarnMsg);
			loggedStrings.should.contain('error: ' + strErrorMsg);
		});

		it('should only log info, warning and error strings from info level', function(){

			var fl = new hpg.fileLogger(filename);

			doLog(fl);

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

			var fl = new hpg.fileLogger(filename, hpg.fileLogger.levels.warning);


			doLog(fl);

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

			var fl = new hpg.fileLogger(filename, hpg.fileLogger.levels.error);

			doLog(fl);

			var loggedStrings = fs.readFileSync(filename, {"encoding": 'utf8'});

			loggedStrings.should.not.contain('trace: ');
			loggedStrings.should.not.contain(strTraceMsg);
			loggedStrings.should.not.contain('propTwo');
			loggedStrings.should.not.contain('info: ' + strInfoMsg);
			loggedStrings.should.not.contain('warning: ' + strWarnMsg);
			loggedStrings.should.contain('error: ' + strErrorMsg);
		});
	})
});