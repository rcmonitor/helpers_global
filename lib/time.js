/**
 * //@by_rcmonitor@//
 * on 06.08.2015.
 */


/**
 * returns date-time in useful format
 *
 * @param {date} oDate
 * @returns {string}	yyyy/mm/dd hh:mm:ss.mil
 */
var dateTime = function(oDate){
	oDate = oDate || new Date();

	var hours = oDate.getHours();
	var minutes = oDate.getMinutes();
	minutes = minutes < 10 ? '0'+minutes : minutes;
	var seconds = oDate.getSeconds();
	var milliseconds = oDate.getMilliseconds();
	var strTime = hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
	var intMonth = parseInt(oDate.getMonth()) + 1;

	var strReturn = oDate.getFullYear()
		+ "/" + intMonth
		+ "/" + oDate.getDate()
		+ " "
		+ strTime;

	return strReturn;
};


/**
 * returns readable string representation with milliseconds of an integer time given
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
exports.dateTime = dateTime;