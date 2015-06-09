'use strict';

var $path = require('path');

var $upTheTree = require('..');

var filename = $path.basename(__filename);

describe ('up-the-tree - finding files', function () {

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

});