# up-the-tree!

> Come away, Hobbits. We climb. We must climb. Up, up, up the tree we go.

**Super fast:**  
Get the path of a file or folder that is somewhere up the folder tree. [Create a `Twig`](#twig) to call `require` from up there, for easy path resolving.

**Slightly more detailed:**  
Navigate up-the-tree from any path until any `condition` is met.

The condition is evaluated from the starting path. If the condition is not met it will go up a folder, until the condition is met or it runs out of folders.

## Installation

```
$ npm install up-the-tree
```

## Usage

### Quickstart

```
var $upTheTree = require('up-the-tree');

// basic usage, see docs for condition and options
$upTheTree(condition, options);

// find folder containing package.json
$upTheTree('package.json');

// find path including package.json
$upTheTree('../package.json');

// create a Twig at my project root
var rootTwig = $upTheTree('package.json', { twig: true });

// load a file relative to my project root
var someLib = rootTwig.require('./lib/some');

// what is the parent folder of my project root?
rootTwig.dirname()

// how far away is my project root from the current dir?
rootTwig.relative(__dirname)

// how far away is it from the working dir?
rootTwig.relative('.')

```

### Condition `string, function`

The condition is evaluated for every folder in the path, until matched. 

If the condition is a `string` it is assumed to be a file, folder, or path, and is wrapped in a function using `return $fs.existsSync($path.join(path, condition))`.

If the condition is a `function` it will be called for every folder in `options.start` until the function returns `true`.


If you're looking for a folder called `booger` in the path `/User/me/some/path`, it will be checked against the paths: `/User/me/some/path`, `/User/me/some`, `/User/me`, `/User`, and `/`, until returning `false`.
  
If you are looking for a folder called `some` in the path `/User/me/some/path`, it will be checked against the paths: `/User/me/some/path`, `/User/me/some`, `/User/me` and will return `/User/me` as that is the path that contains the folder `some`.


#### Finding a file or folder

This could be a file or folder name, or part of a path. It will be compared using ```path.join(currentPath, condition)```, where currentPath equals the directory that is being evaluated.

**Examples**

```
var $upTheTree = require('up-the-tree');

var pathContainingFile = $upTheTree('package.json');

var pathContainingFolder = $upTheTree('node_modules');

var pathContainingPath = $upTheTree('node_modules/extend');

// funky! checks it the folder one-up has the folder node_modules,
// thereby returning the path including the current folder.
// WARNING: this could return a sibling of the node_modules folder!
var nodeModulesRootPath = $upTheTree('../node_modules');
```

#### Custom condition

You may provide a function as condition to perform a custom check on the path. The function should return `true` or `false` to indicate success on the path. Returning `true` will return the `currentPath` to the calling function.

```
var $upTheTree = require('up-the-tree');

var pathWithIndexOf = $upTheTree(function (currentPath) {
	return currentPath.indexOf('node_modules') > -1;
});
```

### Options `object`, optional

#### `options.start` (default: `'.'`)

Deepest path to look in. This indicates the starting point, it will traverse up the folder tree until the condition is met, or it runs out of folders, or until it hits `options.end`.

#### `options.end` (default: `'/'`)

Undeepest path to look in. This indicates how far up the tree it should go. It will look in this folder last.

**Note:** `options.start` should be within `options.end`.

#### `options.twig` (default: `false`)

Creates a twig on the returned path.

## Twig (`class`)

Now that's awesome, lock that resulting path in place and perform tricks with it.

```
var $upTheTree = require('up-the-tree');

var twigFromConfig = $upTheTree('package.json', { twig: true });

var manualTwig = new $upTheTree.Twig('./node_modules');
```

### Twig.toString()

Returns the current path as string. Will sometime be called automatically when you attempt
to use the instance as a string.

### Twig.require(`path`)

Calls `require` relative from Twig path

### Twig.move(`path`)

Changes the current path of the Twig to the `path`. Uses `$path.resolve`.

### Twig.resolve(`path`)

Returns `$path.resolve(Twig.toString(), path)` 

### Twig.relative(`path`)

Returns `$path.relative(Twig.toString(), path)` 

### Twig.dirname()

Returns `$path.dirname(Twig.toString())`

### Twig.parse()

Returns `$path.parse(Twig.toString())`

**NOTE:** Only present for version Node v0.12.x
