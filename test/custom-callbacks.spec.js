'use strict';

var $path = require('path');

var $upTheTree = require('..');


describe ('up-the-tree - custom callbacks', function () {

	it ('should match a truthy .indexOf function', function () {

		expect($upTheTree(function (path) {
			return path.indexOf('up-the-tree') > -1;
		})).toEqual($path.resolve('.'));

	});

	it ('should match a falsy .indexOf function', function () {

		expect($upTheTree(function (path) {
			return path.indexOf('booger') > -1;
		})).toEqual(false);

	});

	it ('should match a falsy .indexOf function starting deeper', function () {

		expect($upTheTree($path.join(__dirname, 'a/few/levels/deep'), function (path) {
			return path.indexOf('deep') === -1;
		})).toEqual($path.join(__dirname, 'a/few/levels'));

	});

});