'use strict';

var $path = require('path');

var $upTheTree = require('..');


describe ('up-the-tree - resolve path', function () {

    it ('should merge the search path with the result path', function () {

        var res = $upTheTree.resolve('package.json');
        expect(res).toEqual($path.resolve(__dirname, '..', 'package.json'));

    });

    it ('should not choke when path is not found', function () {

        var res = $upTheTree.resolve('doesnotexist.json');
        expect(res).toEqual(false);

    });

    it ('should not work with custom conditions', function () {

        expect(function () {
            $upTheTree.resolve(function () {
                return true;
            });
        }).toThrow('Condition should be a string (path) when using resolve = true');

    });

    it ('should also be able to Twig', function () {

        var res = $upTheTree.resolve('package.json', {
            twig: true
        });

        expect(res.toString()).toEqual($path.resolve(__dirname, '..', 'package.json'));

    });

    it ('should also be able to Twig', function () {

        var res = $upTheTree.resolve('package.json', {
            twig: true
        });

        expect(res.toString()).toEqual($path.resolve(__dirname, '..', 'package.json'));

    });

});
