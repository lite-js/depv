/* jshint strict: true, undef: true, unused: true, node: true */
// /* global */
"use strict";

var
    fs = require('fs'),
    pastry = require('pastry'),
    utils = require('../utils.js'),

    seperator = '/',

    re = {
        fileFilter    : /\.py$/i,
        //fileIgnore    : /_test\.go$/i,
        //package       : /^package\s+(.+)\s*/,
        //multiLineDeps : /import\s+\(([^\)]+)\)/gm,
        inlineDeps    : /\s*import\s+([^\'")]+)/gm
    },

    analyse = function (option) {
        var fileContent,
            //packageResult,
            //depsResult,
            inlineDepsResult,
            node,
            nodes      = [],
            edges      = [],
            nodesAdded = {},
            edgesAdded = {};

        function addNodeById (id) {
            if (!nodesAdded[id]) {
                nodesAdded[id] = true;
                nodes.push({
                    id   : id,
                    name : id
                });
            }
        }
        function addLink (source, target) {
            var id = pastry.sprintf('S%sT%s', source, target);
            if (!edgesAdded[id]) {
                edgesAdded[id] = true;
                edges.push({
                    id     : id,
                    source : source,
                    target : target
                });
            }
        }
        function getDepPackages (str) {
            var pkgs = str.split(/\s+/g),
                result = [];
            pastry.each(pkgs, function (pkg) {
                pkg = pastry.trim(pkg);
                if (!pastry.some([
                    '\\',
                    '(',
                    ')',
                    'import',
                    '$'
                ], function (ignoreStr) {
                    return pkg.indexOf(ignoreStr) !== -1;
                })) {
                    if (pastry.isString(pkg) && pkg !== '') {
                        result.push(pkg);
                    }
                }
            });
            return result;
        }

        utils.walkFiles(option.directory, function (file) {
        });

        return {
            nodes     : nodes,
            edges     : edges,
            seperator : seperator
        };
    };

module.exports = {
    analyse: analyse
};
