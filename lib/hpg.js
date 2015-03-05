/**
 * //@by_rcmonitor@//
 * on 05.03.2015.
 */
var util = require('util');

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
var log = function(/*variable, description[, boolReturn = false]*/){

	var variable = arguments[0]
		, description = arguments[1]
		, boolReturn = arguments[2]
	;

	var strResult = '';

	description = typeof description !== 'undefined' ? description : 'given variable is';
	boolReturn = typeof boolReturn !== 'undefined';

	var options = {
		showHidden: false
		, depth: 2
		, colors: true
		, customInspect: true
	};


	strResult = description + ': ' + getType(variable) + ':' + "\n";
	strResult += util.inspect(variable, options);

	if(boolReturn){
		return strResult;
	}else{
		console.log(strResult);
	}
};


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