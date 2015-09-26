/**
 * Created by jack on 26-Sep-15.
 */
'use strict';

function executeBeforeShutdown(oBeforeShutdown){

	for(let strFunctionName in oBeforeShutdown){

		oBeforeShutdown[strFunctionName].object[strFunctionName].apply(
			oBeforeShutdown[strFunctionName].object
			, oBeforeShutdown[strFunctionName].arguments
		);
	}
}


function exitHandler(options, err) {

	if (options.cleanup){

		executeBeforeShutdown(options.functions);

	}
	if (err) console.log(err.stack);
	if (options.exit) process.exit();
}

function registerExitHandler(oBeforeShutdown){

	process.stdin.resume();//so the program will not close instantly

//do something when app is closing
	process.on('exit', exitHandler.bind(null,{cleanup:true, functions: oBeforeShutdown}));

//catches ctrl+c event
	process.on('SIGINT', exitHandler.bind(null, {exit:true, functions: oBeforeShutdown}));

//catches uncaught exceptions
	process.on('uncaughtException', exitHandler.bind(null, {exit:true, functions: oBeforeShutdown}));

}


module.exports = registerExitHandler;