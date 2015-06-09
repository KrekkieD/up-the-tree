'use strict';

var $upTheTree = require('..');

describe ('up-the-tree config errors', function () {

	it ('should throw an error when config start is not a path within config end', function () {

		expect(function () {
			$upTheTree('package.json', {
				start: '.',
				end: '/Library'
			})
		}).toThrow('options.start path is not within options.end');

	});

});