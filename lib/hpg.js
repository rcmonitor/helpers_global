/**
 * //@by_rcmonitor@//
 * on 05.03.2015.
 */

var files = require('./files');
var types = require('./types');
var time = require('./time');
var logger = require('./logger');

var Environment = require('./environment');
var FileLogger = require('./fileLogger');
var Configurator = require('./configurator');



exports.log = logger.log;
exports.time = time.time;
exports.diff = time.diff;
exports.getTime = time.getTime;
exports.getType = types.getType;
exports.ensureFileExistsSync = files.ensureFileExistsSync;
exports.ensureFileNotExistsSync = files.ensureFileNotExistsSync;
exports.ensureDirectoryExistsSync = files.ensureDirectoryExistsSync;

exports.FileLogger = FileLogger;
exports.Environment = Environment;
exports.Configurator = Configurator;
