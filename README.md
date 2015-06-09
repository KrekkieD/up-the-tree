# up-the-tree!

> Come away, Hobbits. We climb. We must climb. Up, up, up the tree we go.

Navigate up-the-tree from any path until you reach any* condition.

The condition is evaluated from the starting path. If the condition is not met it will go up a folder, until the condition is met or it runs out of folders.

## Installation

```
$ npm install up-the-tree
```

## Usage

```
var $upTheTree = require('up-the-tree');

var matchedPath = $upTheTree(condition, options);
```

### Condition (`string, function`)

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
```

#### Custom condition

You may provide a function as condition to perform a custom check on the path. The function should return `true` or `false` to indicate success on the path. Returning `true` will return the `currentPath` to the calling function.

```
var $upTheTree = require('up-the-tree');

var pathWithIndexOf = $upTheTree(function (currentPath) {
	return currentPath.indexOf('node_modules') > -1;
});
```

### Options

#### `options.start` (default: `'.'`)

Deepest path to look in. This indicates the starting point, it will traverse up the folder tree until the condition is met, or it runs out of folders, or until it hits `options.end`.

#### `options.end` (default: `'/'`)

Undeepest path to look in. This indicates how far up the tree it should go. It will look in this folder last.

**Note:** `options.start` should be within `options.end`.