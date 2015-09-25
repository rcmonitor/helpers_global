/**
 * Created by jack on 25-Sep-15.
 */
'use strict';

class Trait{

	constructor(methods){
		this.traits = [methods];
	}
}

Trait.prototype.use = function (trait) {
	this.traits = this.traits.concat (trait.traits);
	return this;
};

Trait.prototype.useBy = function (obj) {
	for (var i = 0; i < this.traits.length; ++i) {
		var methods = this.traits [i];
		for (var prop in methods) {
			if (methods.hasOwnProperty (prop)) {
				obj [prop] = obj [prop] || methods [prop];
			}
		}
	}
};

Trait.unimplemented = function (obj, traitName) {
	if (obj === undefined || traitName === undefined) {
		throw new Error ("Unimplemented trait property.");
	}
	throw new Error (traitName + " is not implemented for " + obj);
};


module.exports = Trait;