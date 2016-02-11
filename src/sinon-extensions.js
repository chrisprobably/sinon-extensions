if (typeof exports === 'object') {
	sinon = require('sinon');
};

(function (sinon) {
	'use strict';

	var originalCreateStubInstance = sinon.createStubInstance;

	function restoreAllStubbedFunctions(stubbedObject) {
		Object.keys(stubbedObject).forEach(function(ownProperty) {
			if (stubbedObject[ownProperty].isSinonProxy && typeof stubbedObject[ownProperty].restore === 'function') {
				stubbedObject[ownProperty].restore();
			}
		});
	}

	sinon.createStubModuleInstance = function(constructor) {
		var F = function() {};
		F.prototype = new constructor;
		return sinon.createStubInstance(F);
	};

	sinon.createStubInstance = function(constructor) {
		var stubInstance = originalCreateStubInstance(constructor);
		stubInstance.restore = restoreAllStubbedFunctions.bind(null, stubInstance);
		return stubInstance;
	};


})(sinon);
