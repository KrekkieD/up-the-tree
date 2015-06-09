'use strict';

var $path = require('path');

var $upTheTree = require('..');


var filename = $path.basename(__filename);

describe ('up-the-tree - finding files', function () {

	it ('should find package.json in the CWD', function () {

		expect($upTheTree('package.json')).toEqual($path.resolve('.'));

	});

	it ('should find ' + filename + ' in this folder', function () {

		expect($upTheTree($path.resolve(__dirname), filename))
			.toEqual($path.resolve(__dirname));

	});

	it ('should find ' + filename + ' in this folder when starting deeper', function () {

		expect($upTheTree($path.join(__dirname, 'mockdata/a/few/levels/deep'), filename))
			.toEqual($path.resolve(__dirname));

	});

	it ('should not find finding-files.spec.js in this folder when starting deeper and limiting down the road', function () {

		expect($upTheTree(
			$path.join(__dirname, 'mockdata/a/few/levels/deep'),
			filename,
			$path.join(__dirname, 'mockdata/a/few')
		)).toEqual(false);

	});

});