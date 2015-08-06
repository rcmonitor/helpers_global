/**
 * //@by_rcmonitor@//
 * on 06.08.2015.
 */

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


exports.getType = getType;