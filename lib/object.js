/**
 * //@by_rcmonitor@//
 * on 28.08.2015.
 */

var types = require('./types');

var extend = function(oRecipient, oDonor){
	if(oDonor){

		var strPropertyName;

		for(strPropertyName in oDonor){
			if(types.getType(oRecipient[strPropertyName]) == 'object'
				&& types.getType(oDonor[strPropertyName])){
				extend(oRecipient[strPropertyName], oDonor[strPropertyName]);
			}else{
				oRecipient[strPropertyName] = oDonor[strPropertyName];
			}
		}
	}
};

exports.extend = extend;