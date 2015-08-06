/**
 * //@by_rcmonitor@//
 * on 05.03.2015.
 */
//var util = require('util');
//var fs = require('fs');
//var os = require('os');
//var path = require('path');

var Environment = require('./environment');
var FileLogger = require('./fileLogger');
var files = require('./files');
var types = require('./types');
var time = require('./time');
var logger = require('./logger');




exports.log = logger.log;
exports.time = time.time;
exports.diff = time.diff;
exports.getTime = time.getTime;
exports.getType = types.getType;
exports.ensureFileExistsSync = files.ensureFileExistsSync;
exports.ensureFileNotExistsSync = files.ensureFileNotExistsSync;

exports.FileLogger = FileLogger;
exports.Environment = Environment;
