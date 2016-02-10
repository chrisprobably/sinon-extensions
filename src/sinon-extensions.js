if (typeof exports === 'object') {
	sinon = require('sinon');
};

(function (sinon) {
	'use strict';

	sinon.createStubModuleInstance = function(constructor) {
		var F = function() {};
		F.prototype = new constructor;
		return sinon.createStubInstance(F);
	};
})(sinon);
