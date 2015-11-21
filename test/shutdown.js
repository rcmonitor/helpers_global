/**
 * Created by jack on 26-Sep-15.
 */
'use strict';

class SomeTest{
	constructor(){
		this.data = 42;
	}
}

SomeTest.prototype.doMoar = function(){
	this.data *= 2;

	console.log(this.data);
};


SomeTest.prototype.doArgh = function(intValue){
	this.data += intValue;

	console.log(this.data);
};


function executeBeforeShutdown(oBeforeShutdown){

	console.log(oBeforeShutdown);

	for(let strFunctionName in oBeforeShutdown){

		console.log('applying ' + strFunctionName);

		oBeforeShutdown[strFunctionName].object[strFunctionName].apply(
			oBeforeShutdown[strFunctionName].object
			, oBeforeShutdown[strFunctionName].arguments
		);
	}
}


function exitHandler(options, err) {


	if (options.cleanup){

		executeBeforeShutdown(options.functions);

//		hpg.log(arVisitRedirects, 'visited');
//		hpg.log(arLoginRedirects, 'login');
//		hpg.log(oLoginCookies, 'login');
//
//		hpg.log(oAllCookies, 'all cookies');

		console.log('clean');
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


let oSome = new SomeTest();


registerExitHandler(
	{
		"doMoar": {
			"object": oSome
		},
		"doArgh": {
			"object": oSome
			, "arguments": [34]
		}
	});

//oSome.doMoar();
//console.log(oSome.data);

//describe('shutdown handler', function(){
//
//	describe('handler', function(){
//
//		it('should process ctrl + c exit', function(done){
//			registerExitHandler();
//		})
//	})
//});