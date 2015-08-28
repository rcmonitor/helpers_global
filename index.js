/**
 * //@by_rcmonitor@//
 * on 05.03.2015.
 */


var files = require('./lib/files');
var types = require('./lib/types');
var time = require('./lib/time');
var logger = require('./lib/logger');
var string = require('./lib/string');
var object = require('./lib/object');

var Environment = require('./lib/environment');
var FileLogger = require('./lib/fileLogger');
var Configurator = require('./lib/configurator');
var ParameterObject = require('./lib/parameterObject');


exports.log = logger.log;
exports.time = time.time;
exports.diff = time.diff;
exports.getTime = time.getTime;
exports.getType = types.getType;
exports.isEmpty = types.isEmpty;
exports.ucfirst = string.ucfirst;
exports.extend = object.extend;
exports.ensureFileExistsSync = files.ensureFileExistsSync;
exports.ensureFileNotExistsSync = files.ensureFileNotExistsSync;
exports.ensureDirectoryExistsSync = files.ensureDirectoryExistsSync;

exports.FileLogger = FileLogger;
exports.Environment = Environment;
exports.Configurator = Configurator;
exports.ParameterObject = ParameterObject;

