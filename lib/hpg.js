/**
 * //@by_rcmonitor@//
 * on 05.03.2015.
 */
var util = require('util');
var fs = require('fs');
var os = require('os');

//var helper = function(){

/**
 * returns type of a variable given
 *
 * @param {*} variable
 * @returns {string}
 */
var getType = function(variable){
	var oTypes = {
		'undefined'        : 'undefined',
		'number'           : 'number',
		'boolean'          : 'boolean',
		'string'           : 'string',
		'[object Function]': 'function',
		'[object RegExp]'  : 'regexp',
		'[object Array]'   : 'array',
		'[object Date]'    : 'date',
		'[object Error]'   : 'error'
	};

	return oTypes[typeof variable] || oTypes[({}).toString.call(variable)] || (variable ? 'object' : 'null');
};


/**
 * logs given variable into string or console
 *
 * @param {*} variable
 * @param {string} [description]
 * @param {boolean} [boolReturn = false]
 * @returns {string}
 */
var log = function(/*variable, description[, boolReturn = false[, boolTrace = false]]*/){

	var variable = arguments[0]
		, description = arguments[1]
		, boolReturn = arguments[2]
		, boolTrace = arguments[3]
	;

	var strResult = '';

	description = typeof description !== 'undefined' ? description : 'given variable is';
	boolReturn = typeof boolReturn !== 'undefined';
	boolTrace = typeof boolTrace !== 'undefined';

	if(boolTrace){
		description = 'trace: ' + description;
	}

	var options = {
		showHidden: false
		, depth: 2
		, colors: true
		, customInspect: true
	};


	strResult = description + ': ' + getType(variable) + ':' + os.EOL;
	strResult += util.inspect(variable, options);

	if(boolReturn){
		return strResult;
	}else{
		console.log(strResult);
	}
};


var fileLogger = function(strFilename, intLogLevel){

	//this.levels = {
	//	"trace": 0
	//	, "info": 1
	//	, "warning": 2
	//	, "error": 3
	//};

	var filename = strFilename;
	var logLevel = typeof intLogLevel == 'undefined' ? 1 : intLogLevel;
	var arLevels = ['trace', 'info', 'warning', 'error'];

	/**
	 * logs given message into file
	 * if log-level is sufficient
	 *
	 * @param {string} strMsg
	 * @param {integer|string} intLogLevel|strTraceMsg
	 */
	this.log = function(/*strMsg[, intLogLevel = 1 (info) | strTraceMsg]*/){
		var strMsg = arguments[0];
		var boolTrace = false;
		var intLogLevel = 1;
		var strOptionalArgumentType = getType(arguments[1]);
		var strTraceMsg = '';

		if(strOptionalArgumentType == 'number'){
			intLogLevel = arguments[1];
		}else if(strOptionalArgumentType == 'string'){
			intLogLevel = 0;
			strTraceMsg = arguments[1];
			boolTrace = true;
		}

		if(intLogLevel >= logLevel){
			if(boolTrace){
				var strFullTraceMsg = log(strMsg, strTraceMsg, true, true);
				fs.appendFileSync(filename, strFullTraceMsg + os.EOL);
			}else{

				fs.appendFileSync(filename, arLevels[intLogLevel] + ': ' + strMsg + os.EOL);
			}
		}
	};
};

fileLogger.levels = {
	"trace": 0
	, "info": 1
	, "warning": 2
	, "error": 3
};


///**
// * logs given message into file
// * if log-level is sufficient
// *
// * @param {string} strMsg
// * @param {integer|string} intLogLevel|strTraceMsg
// */
//fileLogger.prototype.log = function(/*strMsg[, intLogLevel = 1 (info) | strTraceMsg]*/){
//	var strMsg = arguments[0];
//	var boolTrace = false;
//	var intLogLevel = 1;
//	var strOptionalArgumentType = getType(arguments[1]);
//	var strTraceMsg = '';
//
//	log('we`re in logger');
//
//	if(strOptionalArgumentType == 'number'){
//		intLogLevel = arguments[1];
//	}else if(strOptionalArgumentType == 'string'){
//		intLogLevel = 0;
//		strTraceMsg = arguments[1];
//		boolTrace = true;
//	}
//
//	log(intLogLevel, 'log level');
//
//	log(this.logLevel, 'required log level');
//
//	if(intLogLevel >= this.logLevel){
//		if(boolTrace){
//			var strFullTraceMsg = log(strMsg, strTraceMsg, true, true);
//			fs.appendFileSync(this.filename, strFullTraceMsg);
//		}else{
//
//			log('we will not trace');
//
//			fs.appendFileSync(this.filename, this.arLevels[intLogLevel] + ': ' + strMsg);
//		}
//	}
//};



/**
 * returns readable string representation of an integer time given
 *
 * @param {number} intTime
 * @returns {string}
 */
var time = function(intTime){
	var second = 1000;

	var strSeconds = Math.floor(intTime / second).toString();
	var strMilliseconds = (intTime % second).toString();

	var strTime = strSeconds + '.' + strMilliseconds;

	return strTime;
};


/**
 * retrieves current time
 *
 * @returns {number}
 */
var getTime = function(){
	return new Date().getTime();
};


/**
 * returns readable string representation of a
 * diff between current time and a timestamp given
 *
 * @param {number} intTime
 * @returns {string}
 */
var diff = function(intTime){
	return time(getTime() - intTime);
};


exports.log = log;
exports.time = time;
exports.getType = getType;
exports.diff = diff;
exports.getTime = getTime;
exports.fileLogger = fileLogger;