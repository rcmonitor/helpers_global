/**
 * //@by_rcmonitor@//
 * on 06.08.2015.
 */

var os = require('os');
var util = require('util');

var types = require('./types');
var time = require('./time');

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

	strResult = description + ': ' + types.getType(variable) + ':' + os.EOL;
	strResult += util.inspect(variable, options);

	if(boolReturn){
		return strResult;
	}else{
		console.log(strResult);
	}
};


exports.log = log;