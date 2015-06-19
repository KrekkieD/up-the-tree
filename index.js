'use strict';

var $path = require('path');
var $fs = require('fs');

var $extend = require('extend');

var $twig = require('./lib/twig');

module.exports = upTheTree;
module.exports.Twig = $twig;

var DEFAULT_CONFIG = {
	start: $path.resolve('.'),
	end: $path.resolve('/'),
	twig: false
};

function upTheTree (condition, config) {

	config = $extend({}, DEFAULT_CONFIG, config);

	if (typeof condition !== 'function') {

		// this is a fileExists default function
		var fileToFind = condition;
		condition = function (currentPath) {

			return $fs.existsSync($path.join(currentPath, fileToFind));

		};

	}

	// clean paths to prevent errors
	config.start = $path.resolve(config.start);
	config.end = $path.resolve(config.end);

	if ($path.relative(config.end, config.start).indexOf('..') === 0) {
		throw 'options.start path is not within options.end';
	}

	// parse!
	var path = process(condition, config);

	if (path && config.twig) {
		path = new module.exports.Twig(path);
	}

	return path;

}

function process (condition, config) {

	var pathParts = config.start.split($path.sep);

	var thisPath;
	var result;
	for (var i = 0, iMax = pathParts.length; i < iMax; i++) {

		thisPath = pathParts.join($path.sep);

		result = processPath(thisPath, condition);

		if (result) {
			return $path.resolve(thisPath);
		}
		else {
			pathParts.pop();
		}

		if (thisPath === config.end) {
			// don't iterate again, this was our last chance
			break;
		}

	}

	return false;

}

function processPath (path, condition) {

	return condition(path);

}
