'use strict';

var $path = require('path');

var $upTheTree = require('..');

var cfg = {
	twig: true
};

describe ('up-the-tree twig', function () {

	it ('should create an instance when requesting a twig', function () {

		expect($upTheTree('package.json', cfg) instanceof $upTheTree.Twig).toBeTruthy();

	});

	it ('should not create an instance for paths not found', function () {

		expect($upTheTree('notpresent.json', cfg)).toEqual(false);

	});

	it ('should toString() properly', function () {

		expect($upTheTree('package.json', cfg).toString()).toEqual($path.resolve('.'));

		expect($upTheTree('package.json', cfg) + '--').toEqual($path.resolve('.') + '--');

	});

	it ('should move() properly', function () {

		var twig = $upTheTree('package.json', cfg);
		expect(twig.toString()).toEqual($path.resolve(__dirname, '..'));
		twig.move('test');
		expect(twig.toString()).toEqual($path.resolve(__dirname));

	});

	it ('should require() from twig location', function () {

		var rootTwig = $upTheTree('package.json', cfg);
		var $packageJson = rootTwig.require('package.json');

		expect($packageJson).toEqual(require($path.join(rootTwig.toString(), 'package.json')));

	});

	it ('should handle $path functions properly', function () {

		var twig = $upTheTree('package.json', cfg);
		twig.move('test');

		expect(twig.resolve('mockdata')).toEqual($path.join(__dirname, 'mockdata'));
		expect(twig.relative('mockdata')).toEqual($path.relative(__dirname, 'mockdata'));
		expect(twig.dirname()).toEqual($path.resolve(__dirname, '..'));

		// node v0.12 only
		if (process.versions.node.indexOf('0.12') === 0) {
			expect(twig.parse()).toEqual($path.parse(__dirname));
		}
		else if (process.versions.node.indexOf('0.10') === 0) {
			expect(typeof twig.parse).toEqual('undefined');
		}

	});

});