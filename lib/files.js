/**
 * //@by_rcmonitor@//
 * on 06.08.2015.
 */

var fs = require('fs');

/**
 * makes sure that file with path provide exists or creates it
 *
 * @param {string} strPath path to file
 * @param {string} [strFlag='a'] file opening mode (default - appending)
 * @param {object} [oErroneous={}] object to add error to
 * @returns {boolean} true if exists <br />
 * 					false if failed to create
 */
var ensureFileExistsSync = function(strPath, strFlag, oErroneous){

	if(!strFlag){
		strFlag = 'a';
	}

	if(!oErroneous){
		oErroneous = {};
	}

	try{
		rFile = fs.openSync(strPath, strFlag);
		fs.closeSync(rFile);

		return true;
	}catch(error){

		if(!oErroneous.errors){
			oErroneous.errors = [];
		}

		oErroneous.errors.push(error.message);
		return false;
	}
};


/**
 * makes sure that file with path given does not exists; <br />
 * deletes it if necessary
 *
 * @param strPath
 * @returns {boolean} true if deleted <br />
 * 					false if there is no need to delete
 */
var ensureFileNotExistsSync = function(strPath){
	var boolReturn = false;

	if(fs.existsSync(strPath)){
		fs.unlinkSync(strPath);
		boolReturn = true;
	}

	return boolReturn;
};


exports.ensureFileExistsSync = ensureFileExistsSync;
exports.ensureFileNotExistsSync = ensureFileNotExistsSync;
