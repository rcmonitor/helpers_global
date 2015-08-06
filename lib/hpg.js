/**
 * //@by_rcmonitor@//
 * on 05.03.2015.
 */
var util = require('util');
var fs = require('fs');
var os = require('os');
var path = require('path');

var Environment = require('./environment');

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


/**
 * makes sure that file with path provide exists or creates it
 *
 * @param {string} strPath path to file
 * @param {string} [strFlag='a'] file opening mode (default - appending)
 * @param {object} [oErroneous={}] object to add error to
 * @returns {boolean} true if exists <br />
 * 					false if failed to create
 */
var ensureFileExistsSync = function(strPath, strFlag, oErroneous){

	if(!strFlag){
		strFlag = 'a';
	}

	if(!oErroneous){
		oErroneous = {};
	}

	try{
		rFile = fs.openSync(strPath, strFlag);
		fs.closeSync(rFile);

		return true;
	}catch(error){

		if(!oErroneous.errors){
			oErroneous.errors = [];
		}

		oErroneous.errors.push(error.message);
		return false;
	}
};


/**
 * makes sure that file with path given does not exists; <br />
 * deletes it if necessary
 *
 * @param strPath
 * @returns {boolean} true if deleted <br />
 * 					false if there is no need to delete
 */
var ensureFileNotExistsSync = function(strPath){
	var boolReturn = false;

	if(fs.existsSync(strPath)){
		fs.unlinkSync(strPath);
		boolReturn = true;
	}

	return boolReturn;
};


/**
 * initiates file logger with given path and log-level
 *
 * @param {string} strFilename
 * @param {int} intLogLevel
 */
FileLogger = function(strFilename, intLogLevel){
	try{
		this.logFile = fs.openSync(strFilename, 'a');
	}catch(error){
		this.error = error.message;
	}

	this.logLevel = typeof intLogLevel == 'undefined' ? 1 : intLogLevel;
};


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
 */
FileLogger.prototype.log = function(/*strMsg[, intLogLevel = 1 (info) | strTraceMsg]*/){

	if(getType(this.logFile) == 'undefined'){
		return this.error;
	}

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

	if(intLogLevel >= this.logLevel){
		if(boolTrace){
			var strFullTraceMsg = log(strMsg, strTraceMsg, true, true);
			fs.writeSync(this.logFile, strFullTraceMsg + os.EOL);
		}else{

			fs.writeSync(this.logFile, FileLogger.arLevels[intLogLevel] + ': ' + strMsg + os.EOL);
		}
	}
};


FileLogger.prototype.close = function(){
	if(getType(this.logFile) != 'undefined'){
		fs.closeSync(this.logFile);
	}
};


/**
 * returns readable string representation of an integer time given
 *
 * @param {number} [intTime=getTime()] time to convert
 * @returns {string}
 */
var time = function(intTime){

	if(!intTime){
		intTime = getTime();
	}

	var second = 1000;

	var strSeconds = Math.floor(intTime / second).toString();
	var strMilliseconds = (intTime % second).toString();

	return strSeconds + '.' + strMilliseconds;
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
exports.ensureFileExistsSync = ensureFileExistsSync;
exports.ensureFileNotExistsSync = ensureFileNotExistsSync;

exports.FileLogger = FileLogger;
exports.Environment = Environment;
