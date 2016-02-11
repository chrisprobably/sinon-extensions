var sinon = require('sinon');
var chai = require('chai');
var assert = chai.assert;
var sinonExtensions = require('../src/sinon-extensions');

describe('createStubModuleInstance shorthand arguments', function () {

	it('should not stub any functions in the ignore list', function () {
		var myStub = sinon.createStubModuleInstance(function() { return {
			foo: function() {},
			on: function() {},
			emit: function() {}
		}}, {
			ignore: ['on', 'emit']
		});

		assert.isTrue(myStub.foo.isSinonProxy);
		assert.isUndefined(myStub.on.isSinonProxy);
		assert.isUndefined(myStub.emit.isSinonProxy);
	});

	it('should not blow up if any functions in the ignore list do not exist', function () {
		var myStub = sinon.createStubModuleInstance(function() { return {}}, {
			ignore: ['madeup', 'lies']
		});

		assert.isUndefined(myStub.madeup);
		assert.isUndefined(myStub.lies);
	});

});

