var sinon = require('sinon');
var chai = require('chai');
var assert = chai.assert;
var sinonExtensions = require('../src/sinon-extensions');

describe('sinon extensions', function () {
	it('should stub a single function on a module', function () {
		var myStub = sinon.createStubModuleInstance(function() { return {
			foo: function() {}
		}});

		assert.isFunction(myStub.foo);
		assert.isTrue(myStub.foo.isSinonProxy);
	});

	it('should stub multiple functions on a module', function () {
		var myStub = sinon.createStubModuleInstance(function() { return {
			foo: function() {},
			bar: function() {}
		}});

		assert.isTrue(myStub.foo.isSinonProxy);
		assert.isTrue(myStub.bar.isSinonProxy);
	});

	it('should not stub a non-function property', function () {
		var myStub = sinon.createStubModuleInstance(function() { return {
			foo: 'hey'
		}});

		assert.isString(myStub.foo);
		assert.equal('hey', myStub.foo);
	});
});

