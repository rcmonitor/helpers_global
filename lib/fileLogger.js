/**
 * //@by_rcmonitor@//
 * on 06.08.2015.
 */

var os = require('os');
var fs = require('fs');

var types = require('./types');
var logger = require('./logger');
var time = require('./time');
var backtrace = require('./backtrace');


/**
 * initiates file logger with given path and log-level
 *
 * @param {string} strFilename
 * @param {int} intLogLevel
 */
function FileLogger(strFilename, intLogLevel){
	try{
		this.logFile = fs.openSync(strFilename, 'a');
	}catch(error){
		this.error = error.message;
	}

	this.logLevel = typeof intLogLevel == 'undefined' ? FileLogger.levels.info : intLogLevel;
}


FileLogger.levels = {
	"trace": 0
	, "info": 1
	, "warning": 2
	, "error": 3
};

FileLogger.arLevels = ['trace', 'info', 'warning', 'error'];


/**
 * logs given message into file
 * if log-level is sufficient
 *
 * @param {string} strMsg
 * @param {int|string} intLogLevel|strTraceMsg
 * @param {int} [intTracebacks = 0]
 */
FileLogger.prototype.log = function(/*strMsg[, intLogLevel = 1 (info) | strTraceMsg[, intTracebacks = 0]]*/){

	if(!this.logFile){
		return this.error;
	}

	var strMsg = arguments[0];
	var boolTrace = false;
	var intLogLevel = 1;
	var strOptionalArgumentType = types.getType(arguments[1]);
	var strTraceMsg = '';

	if(strOptionalArgumentType == 'number'){
		intLogLevel = arguments[1];
	}else if(strOptionalArgumentType == 'string'){
		intLogLevel = 0;
		strTraceMsg = arguments[1];
		boolTrace = true;
	}

	var intTracebacks = arguments[2] || 0;
	intTracebacks ++;

	if(intLogLevel >= this.logLevel){
		if(boolTrace){
			var strFullTraceMsg = logger.log(strMsg, strTraceMsg, true, true, intTracebacks);
			fs.writeSync(this.logFile, strFullTraceMsg + os.EOL, null, 'utf8');
		}else{

			var strWholeMessage = time.time() + ': ' + FileLogger.arLevels[intLogLevel] + ': ';
			if(this.logLevel == FileLogger.levels.trace){
				strWholeMessage += backtrace(2);
			}

			fs.writeSync(this.logFile, strWholeMessage + strMsg + os.EOL, null, 'utf8');
		}
	}
};


FileLogger.prototype.close = function(){
	if(this.logFile){
		fs.closeSync(this.logFile);
	}
};


module.exports = FileLogger;