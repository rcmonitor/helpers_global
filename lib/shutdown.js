/**
 * Created by jack on 26-Sep-15.
 */
'use strict';

function executeBeforeShutdown(oBeforeShutdown){

	for(let strFunctionName in oBeforeShutdown){

		if(oBeforeShutdown[strFunctionName].property){
			let strPropertyName = oBeforeShutdown[strFunctionName].property;

			oBeforeShutdown[strFunctionName].object[strPropertyName][strFunctionName].apply(
				oBeforeShutdown[strFunctionName].object
				, oBeforeShutdown[strFunctionName].arguments
			);
		}else{

			oBeforeShutdown[strFunctionName].object[strFunctionName].apply(
				oBeforeShutdown[strFunctionName].object
				, oBeforeShutdown[strFunctionName].arguments
			);
		}
	}
}


function exitHandler(options, err) {

	if (options.cleanup){

		executeBeforeShutdown(options.functions);
		
		console.log('all clear');

	}
	if (err) console.log(err.stack);
	if (options.exit) process.exit();
}

function registerShutdownHandler(oBeforeShutdown){

	process.stdin.resume();//so the program will not close instantly

//do something when app is closing
	process.on('exit', exitHandler.bind(null,{cleanup:true, functions: oBeforeShutdown}));

//catches ctrl+c event
	process.on('SIGINT', exitHandler.bind(null, {exit:true, functions: oBeforeShutdown}));

//catches uncaught exceptions
	process.on('uncaughtException', exitHandler.bind(null, {exit:true, functions: oBeforeShutdown}));

}


module.exports = registerShutdownHandler;