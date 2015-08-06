/**
 * //@by_rcmonitor@//
 * on 06.08.2015.
 */


/**
 * returns readable string representation of an integer time given
 *
 * @param {number} [intTime=getTime()] time to convert
 * @returns {string}
 */
var time = function(intTime){

	if(!intTime){
		intTime = getTime();
	}

	var second = 1000;

	var strSeconds = Math.floor(intTime / second).toString();
	var strMilliseconds = (intTime % second).toString();

	return strSeconds + '.' + strMilliseconds;
};


/**
 * retrieves current time
 *
 * @returns {number}
 */
var getTime = function(){
	return new Date().getTime();
};


/**
 * returns readable string representation of a
 * diff between current time and a timestamp given
 *
 * @param {number} intTime
 * @returns {string}
 */
var diff = function(intTime){
	return time(getTime() - intTime);
};


exports.time = time;
exports.getTime = getTime;
exports.diff = diff;