'use strict';

var $path = require('path');
var $fs = require('fs');

module.exports = upTheTree;

function upTheTree () {

	var args = Array.prototype.slice.call(arguments);

	var startingPoint = $path.resolve('.');
	var condition = args[0];
	var endPoint = undefined;

	if (args.length > 1) {
		startingPoint = $path.resolve(args[0]);
		condition = args[1];
	}
	if (args.length > 2) {
		endPoint = args[2];
	}

	// format startingPoint, force / as path sep for more consistent processing
	startingPoint = startingPoint.replace(new RegExp($path.sep, 'g'), '/');

	if (typeof condition !== 'function') {

		// this is a fileExists default function
		var fileToFind = condition;
		condition = function (currentPath) {

			return $fs.existsSync($path.join(currentPath, fileToFind));

		};

	}

	if (typeof endPoint !== 'undefined') {
		endPoint = endPoint.replace(new RegExp($path.sep, 'g'), '/');
	}


	// parse!
	return process(startingPoint, condition, endPoint);

}

function process (start, condition, end) {

	var pathParts = start.split('/');

	var thisPath;
	var result;
	for (var i = 0, iMax = pathParts.length; i < iMax; i++) {

		thisPath = pathParts.join('/');

		//console.log(thisPath);

		result = processPath(thisPath, condition);

		if (result) {
			return thisPath;
		}
		else {
			pathParts.pop();
		}

		if (thisPath === end) {
			// don't iterate again, this was our last chance
			break;
		}

	}

	return false;

}

function processPath (path, condition) {

	return condition(path);

}