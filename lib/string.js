/**
 * //@by_rcmonitor@//
 * on 25.08.2015.
 */


/**
 * makes firs character of a string upper
 *
 * @param {string} str
 * @returns {string}
 */
var ucfirst = function(str) {

	str += '';
	var f = str.charAt(0)
		.toUpperCase();
	return f + str.substr(1);
};


exports.ucfirst = ucfirst;