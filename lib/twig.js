'use strict';

var $path = require('path');

module.exports = Twig;

function Twig (path) {

	var self = this;

	self.path = _setPath(path);
	self.toString = toString;

	self.move = move;
	self.require = requireFromTwig;

	// $path-based helpers
	self.resolve = pathResolve;
	self.relative = pathRelative;
	self.dirname = pathDirname;

	if (process.versions.node.indexOf('0.12') === 0) {
		self.parse = pathParse;
	}


	function _setPath (path) {

		self.path = $path.normalize(path);
		return self.path;

	}

	function toString () {

		return self.path;

	}



	function move (path) {

		return _setPath($path.resolve(self.path, path));

	}

	function requireFromTwig (requirePath) {

		return require($path.join(self.path, requirePath));

	}


	function pathResolve (to) {

		return $path.resolve(self.path, to);

	}

	function pathRelative (to) {

		return $path.relative(self.path, to);

	}

	function pathDirname () {

		return $path.dirname(self.path);

	}

	function pathParse () {

		return $path.parse(self.path);

	}

}