/**
 * Created by jack on 05-Sep-15.
 */


var path = require('path');
var traceback = require('traceback');

var backtrace = function(intStepBack, intPathDepth){

	var strReturn, arPath, strShortPath;

	intStepBack = intStepBack || 2;
	intPathDepth = intPathDepth || 2;

	var arStack = traceback();

	var oTraceItem = arStack[intStepBack];

	if(oTraceItem){
		var strPath = arStack[intStepBack].path;

		var strSep = path.sep;
		if(strSep == "\\"){

			arPath = strPath.split('\\');
		}else{
			arPath = strPath.split(strSep);
		}

		var intPathCount = arPath.length >= intPathDepth ? intPathDepth : arPath.length;

		strShortPath = arPath.slice(intPathCount * -1).join('/');

		strReturn = strShortPath + ': ' + oTraceItem.line + ': ';
	}

	return strReturn;
};

module.exports = backtrace;