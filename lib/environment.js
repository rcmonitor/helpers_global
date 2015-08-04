/**
 * //@by_rcmonitor@//
 * on 04.08.2015.
 */

function Environment(){

}


Environment.types = {
	  test: 'test'
	, development: 'development'
	, production: 'production'
};


Environment.setTest = function(){
	process.env.NODE_ENV = Environment.types.test;
};


Environment.setDevelopment = function(){
	process.env.NODE_ENV = Environment.types.development;
};


Environment.setProduction = function(){
	process.env.NODE_ENV = Environment.types.production;
};


Environment.isTest = function(){
	return process.env.NODE_ENV === Environment.types.test;
};


Environment.isDevelopment = function(){
	return process.env.NODE_ENV === Environment.types.development;
};


Environment.isProduction = function(){
	return process.env.NODE_ENV === Environment.types.production;
};


module.exports = Environment;