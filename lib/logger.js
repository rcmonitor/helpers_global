/**
 * //@by_rcmonitor@//
 * on 06.08.2015.
 */

var os = require('os');
var util = require('util');

var types = require('./types');
var time = require('./time');
var backtrace = require('./backtrace');
var environment = require('./environment');

/**
 * logs given variable into string or console
 *
 * @param {*} variable
 * @param {string} [description]
 * @param {boolean} [boolReturn = false]
 * @param {int} [intTraceBacks = 0]
 * @returns {string}
 */
var log = function(/*variable, description[, boolReturn = false[, boolTrace = false[, intTraceBacks = 0]]*/){

	var variable = arguments[0]
		, description = arguments[1]
		, boolReturn = arguments[2]
		, boolTrace = arguments[3]
		, intTraceBacks = arguments[4] || 0
		, strResult
		;

	var intDefaultTraceBack = 2;

	description = typeof description !== 'undefined' ? description : 'given variable is';
	boolReturn = typeof boolReturn !== 'undefined';
	boolTrace = typeof boolTrace !== 'undefined';

	if(environment.isDevelopment()){
		boolTrace = true;
	}


	if(boolTrace){
//		description = 'trace: ' + description;
		description = 'trace: ' + backtrace(intDefaultTraceBack + intTraceBacks) + description;
	}

	var options = {
		  showHidden: false
		, depth: 2
		, colors: false
		, customInspect: true
	};

	strResult = description + ': ' + types.getType(variable) + ':' + os.EOL;
	strResult += util.inspect(variable, options);

	if(boolReturn){
		return strResult;
	}else{
		console.log(strResult);
	}
};


exports.log = log;