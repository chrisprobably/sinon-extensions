var sinon = require('sinon');
var chai = require('chai');
var assert = chai.assert;
var sinonExtensions = require('../src/sinon-extensions');

describe('restore', function () {

	var ClassicPrototypalClass = function() {};
	ClassicPrototypalClass.prototype.doSomething = function() { return 'not stubbed'; };
	ClassicPrototypalClass.prototype.lose = function() { return 'not stubbed'; };

	var RevealingModule = function() {
		return {
			foo: function() {
				return 'not stubbed';
			}
		}
	};

	it('should restore all functions on a stub instance', function () {
		var myStub = sinon.createStubInstance(ClassicPrototypalClass);
		myStub.doSomething.returns('totally stubbed');

		assert.equal('totally stubbed', myStub.doSomething());

		myStub.restore();

		assert.equal('not stubbed', myStub.doSomething());
	});

	it('should restore all functions on a stub module instance', function () {
		var myStub = sinon.createStubModuleInstance(RevealingModule);
		myStub.foo.returns('totally stubbed');

		assert.equal('totally stubbed', myStub.foo());

		myStub.restore();

		assert.equal('not stubbed', myStub.foo());
	});

	it('should restore all functions even if some have already been restored', function () {
		var myStub = sinon.createStubInstance(ClassicPrototypalClass);

		myStub.lose.restore();
		myStub.restore();

		assert.equal('not stubbed', myStub.doSomething());
		assert.equal('not stubbed', myStub.lose());
	});
});

