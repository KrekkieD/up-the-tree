'use strict';

var $path = require('path');

var $upTheTree = require('..');

var filename = $path.basename(__filename);

describe ('up-the-tree - finding files', function () {

	it ('should be able to find a file without config', function () {

		expect($upTheTree('package.json')).toEqual($path.resolve(__dirname, '..'));

	});

	it ('should find package.json in the CWD', function () {

		expect($upTheTree('package.json')).toEqual($path.resolve('.'));
		expect($upTheTree('package.json', {
			start: '.'
		})).toEqual($path.resolve('.'));

	});

	it ('should find ' + filename + ' in this folder', function () {

		expect($upTheTree(filename, {
			start: $path.resolve(__dirname)
		})).toEqual($path.resolve(__dirname));

	});

	it ('should find the directory mockdata in this folder', function () {

		expect($upTheTree('mockdata/a', {
			start: $path.resolve(__dirname)
		})).toEqual($path.resolve(__dirname));

	});

	it ('should be able to return a path that includes the searched folder', function () {

		expect($upTheTree('../levels', {
			start: $path.join(__dirname, 'mockdata/a/few/levels/deep')
		})).toEqual($path.join(__dirname, 'mockdata/a/few/levels'));

		expect($upTheTree('../a/few/levels', {
			start: $path.join(__dirname, 'mockdata/a/few/levels/deep')
		})).toEqual($path.join(__dirname, 'mockdata/a'));

		// confirm weird behaviour
		expect($upTheTree('../random-sibling', {
			start: $path.join(__dirname, 'mockdata/a/few/levels/deep')
		})).toEqual($path.join(__dirname, 'mockdata/a/few/levels'));

	});

	it ('should find ' + filename + ' in this folder when starting deeper', function () {

		expect($upTheTree(filename, {
			start: $path.join(__dirname, 'mockdata/a/few/levels/deep')
		})).toEqual($path.resolve(__dirname));

	});

	it ('should not find finding-files.spec.js in this folder when starting deeper and limiting down the road', function () {

		expect($upTheTree(filename, {
			start: $path.join(__dirname, 'mockdata/a/few/levels/deep'),
			end: $path.join(__dirname, 'mockdata/a/few')
		})).toEqual(false);

	});

	it ('should use package.json as default when condition is null, false, undefined or an empty string', function () {

		var projectRoot = $path.resolve(__dirname, '..');


		expect($upTheTree()).toEqual(projectRoot);

		expect($upTheTree('', {
			start: $path.join(__dirname, 'mockdata/a/few/levels/deep')
		})).toEqual(projectRoot);

		expect($upTheTree(null, {
			start: $path.join(__dirname, 'mockdata/a/few/levels/deep')
		})).toEqual(projectRoot);

		expect($upTheTree(false, {
			start: $path.join(__dirname, 'mockdata/a/few/levels/deep')
		})).toEqual(projectRoot);

		expect($upTheTree(undefined, {
			start: $path.join(__dirname, 'mockdata/a/few/levels/deep')
		})).toEqual(projectRoot);

	});

});
