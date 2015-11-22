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
var stream = require('./lib/stream');

var Environment = require('./lib/environment');
var FileLogger = require('./lib/fileLogger');
var Configurator = require('./lib/configurator');
var ParameterObject = require('./lib/parameterObject');
var Trait = require('./lib/trait');
var tErroneous = require('./lib/tErroneous');

var registerShutdownHandler = require('./lib/shutdown');

exports.log = logger.log;
exports.time = time.time;
exports.diff = time.diff;
exports.getTime = time.getTime;
exports.dateTime = time.dateTime;
exports.getDayI18N = time.getDayI18N;
exports.getMonthI18N = time.getMonthI18N;
exports.availableLocales = time.availableLocales;
exports.getType = types.getType;
exports.isEmpty = types.isEmpty;
exports.ucfirst = string.ucfirst;
exports.extend = object.extend;
exports.ensureFileExistsSync = files.ensureFileExistsSync;
exports.ensureFileNotExistsSync = files.ensureFileNotExistsSync;
exports.ensureDirectoryExistsSync = files.ensureDirectoryExistsSync;
exports.createEmptyReadableStream = stream.createEmptyReadableStream;
exports.registerShutdownHandler = registerShutdownHandler;

exports.FileLogger = FileLogger;
exports.Environment = Environment;
exports.Configurator = Configurator;
exports.ParameterObject = ParameterObject;
exports.Trait = Trait;
exports.tErroneous = tErroneous;