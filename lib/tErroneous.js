/**
 * Created by jack on 25-Sep-15.
 */

var types = require('./types');
var Trait = require('./trait');

var oMethods = {

	  errors: []

	, addError: function(error){
		var strErrorType = types.getType(error);

		if(strErrorType == 'array'){
			this.errors = this.errors.concat(error);
		}else if(strErrorType == 'error'){
			this.errors.push(error.message);
		}else{
			this.errors.push(error);
		}
	}

	, hasError: function(){
		return !types.isEmpty(this.errors);
	}

	, getErrors: function(){
		return this.errors;
	}
};

var tErroneous = new Trait(oMethods);

module.exports = tErroneous;