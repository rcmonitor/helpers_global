/**
 * //@by_rcmonitor@//
 * on 06.08.2015.
 */

var path = require('path');
var fs = require('fs');

var files = require('./files');

var Environment = require('./environment');
var FileLogger = require('./fileLogger');


/**
 * creates conventional configuration files / objects <br />
 * configuration file should exists as projectDir/config/strName.json <br />
 * log file will be created as projectDir/log/strName.log
 *
 * @param strBasePath
 * @param strName
 * @constructor
 */
function Configurator(strBasePath, strName){

	this.errors = [];

	var strLogDir = path.join(strBasePath, 'log');

	if(files.ensureDirectoryExistsSync(strLogDir, this)){

		var strLogFilePath = path.join(strLogDir, strName + '.log');
		this.fileLogger = new FileLogger(strLogFilePath, this.defineLogLevel());
	}

	var strConfigFile = path.join(strBasePath, 'config', strName);
	var strConfigFilePath = strConfigFile + '.json';

	if(fs.existsSync(strConfigFilePath)){
		this.config = require(strConfigFile);
	}else{
		this.errors.push('file "' + strConfigFilePath + '" not found');
	}

}


Configurator.availableProperties = {
	fileLogger: "fileLogger",
	config: "config",
	errors: "errors"
};


Configurator.prototype.defineLogLevel = function(){
	var intLogLevel;
	var oLevels = FileLogger.levels;

	if(Environment.isDevelopment()){
		intLogLevel = oLevels.trace;
	}else if(Environment.isTest()){
		intLogLevel = oLevels.info;
	}else if(Environment.isProduction()){
		intLogLevel = oLevels.warning;
	}

	return intLogLevel;
};


module.exports = Configurator;