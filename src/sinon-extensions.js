if (typeof exports === 'object') {
	sinon = require('sinon');
};

(function (sinon) {
	'use strict';

	var originalCreateStubInstance = sinon.createStubInstance;

	function isRestorable(object, objectFunction) {
		return object[objectFunction] && object[objectFunction].isSinonProxy && typeof object[objectFunction].restore === 'function';
	}

	function restoreAllStubbedFunctions(stubbedObject) {
		Object.keys(stubbedObject).forEach(function(ownProperty) {
			if (isRestorable(stubbedObject, ownProperty)) {
				stubbedObject[ownProperty].restore();
			}
		});
	}

	function restoreStubbedFunctions(stubbedObject, functionList) {
		functionList.forEach(function(stubbedFunctionToIgnore) {
			if (isRestorable(stubbedObject, stubbedFunctionToIgnore)) {
				stubbedObject[stubbedFunctionToIgnore].restore();
			}
		});
	}

	sinon.createStubModuleInstance = function(constructor, shorthandOptions) {
		var F = function() {};
		F.prototype = new constructor;
		return sinon.createStubInstance(F, shorthandOptions);
	};

	sinon.createStubInstance = function(constructor, shorthandOptions) {
		var stubInstance = originalCreateStubInstance(constructor);
		stubInstance.restore = restoreAllStubbedFunctions.bind(null, stubInstance);

		if (shorthandOptions) {
			if (shorthandOptions.ignore instanceof Array) {
				restoreStubbedFunctions(stubInstance, shorthandOptions.ignore);
			}
		}
		return stubInstance;
	};


})(sinon);
