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
	minutes = minutes < 10 ? '0' + minutes : minutes;
	var seconds = oDate.getSeconds();
	seconds = seconds < 10 ? '0' + seconds : seconds;
	var milliseconds = oDate.getMilliseconds();
	milliseconds = milliseconds < 100 ? '0' + milliseconds : milliseconds;
	milliseconds = milliseconds < 100 ? '0' + milliseconds : milliseconds;
	var strTime = hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
	var intMonth = parseInt(oDate.getMonth()) + 1;

	return oDate.getFullYear()
		+ "/" + intMonth
		+ "/" + oDate.getDate()
		+ " "
		+ strTime;
};


/**
 * returns readable string representation in seconds with milliseconds of an integer time given
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


var oMonthI18N = {
	"en-US": {
		"long": ["January", "February", "March", "April", "May", "June", "July", "August"
			, "September", "October", "November", "December"]
	}
	, "ru-RU": {
		"long": ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август"
			, "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
	}
};

var oDayI18N = {
	"en-US": {
		  "long": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
		, "short": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
	},
	"ru-RU": {
		  "long": ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]
		, "short": ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"]
	}
};


var getMonthI18N = function(intOffset, strLocale, strLength){
	strLocale = strLocale || "ru-RU";
	strLength = strLength || "long";

	return oMonthI18N[strLocale][strLength][intOffset];
};


var getDayI18N = function(intOffset, strLocale, strLength){
	strLocale = strLocale || "ru-RU";
	strLength = strLength || "long";

	return oDayI18N[strLocale][strLength][intOffset];
};


var availableLocales = {
	"ru-RU": "ru-RU"
	, "en-US": "en-US"
};


exports.time = time;
exports.getTime = getTime;
exports.diff = diff;
exports.dateTime = dateTime;
exports.getDayI18N = getDayI18N;
exports.getMonthI18N = getMonthI18N;
exports.availableLocales = availableLocales;
