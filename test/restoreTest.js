var sinon = require('sinon');
var chai = require('chai');
var assert = chai.assert;
var sinonExtensions = require('../src/sinon-extensions');

describe('restore', function () {

	var MegaTron = function() {};
	MegaTron.prototype.doSomething = function() { return 'not stubbed'; };

	it('should restore all functions on a stub instance', function () {
		var myStub = sinon.createStubInstance(MegaTron);
		myStub.doSomething.returns('totally stubbed');

		assert.equal('totally stubbed', myStub.doSomething());

		myStub.restore();

		assert.equal('not stubbed', myStub.doSomething());
	});
});

