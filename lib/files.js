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

	try{
		rFile = fs.openSync(strPath, strFlag);
		fs.closeSync(rFile);

		return true;
	}catch(error){

		if(oErroneous){
			if(!oErroneous.errors){
				oErroneous.errors = [];
			}

			oErroneous.errors.push(error.message);
		}

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


/**
 * makes sure that directory exists; <br />
 * if not, tries to create
 *
 * @param {string} strPath path of the directory that should be created
 * @param {object} oErroneous object to dump error into;  <br />
 * 		should contain errors[] array, or it would be created
 * @returns {boolean} true if exists or were created; <br />
 * 					false otherwise
 */
var ensureDirectoryExistsSync = function(strPath, oErroneous){
	var boolReturn = false;

	if(fs.existsSync(strPath)){
		boolReturn = true;
	}else{
		try{
			fs.mkdirSync(strPath);
			boolReturn = true;
		}catch(error){
			if(oErroneous){
				if(!oErroneous.errors){
					oErroneous.errors = [];
				}

				oErroneous.errors.push(error.message);
			}

			boolReturn = false;
		}
	}

	return boolReturn;
};


exports.ensureFileExistsSync = ensureFileExistsSync;
exports.ensureFileNotExistsSync = ensureFileNotExistsSync;
exports.ensureDirectoryExistsSync = ensureDirectoryExistsSync;
