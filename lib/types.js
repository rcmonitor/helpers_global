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


var oEmptyVariables = {
	  "undefined": true
	, "null": true
	, "number": false
	, "boolean": false
	, "function": false
	, "regexp": false
	, "date": false
	, "error": false
};


var isEmpty = function(variable){

	var boolReturn;
	var strType = getType(variable);

	if(oEmptyVariables.hasOwnProperty(strType)){
		boolReturn = oEmptyVariables[strType];
	}else{
		switch (strType) {
			case 'object':
				boolReturn = isObjectEmpty(variable);
				break;

			case 'string':
				boolReturn = variable ? false : true;
				break;

			case 'array':
				boolReturn = variable.length ? false : true;
				break;
		}
	}

	return boolReturn;
};


var isObjectEmpty = function(oObject){

	var strPropertyName;

	for(strPropertyName in oObject){
		if(oObject.hasOwnProperty(strPropertyName)){
			return false;
		}
	}

	return true;
};


exports.getType = getType;
exports.isEmpty = isEmpty;