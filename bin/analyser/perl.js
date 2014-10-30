/* jshint strict: true, undef: true, unused: true, node: true */
// /* global */
"use strict";

var
    fs = require('fs'),
    pastry = require('pastry'),
    utils = require('../utils.js'),

    seperator = '::',

    re = {
        fileFilter : /\.(pm|pl)$/i,
        package    : /package\s+(.+)\s*;/,
        depsMatch  : /use\s+(.+);/gm,
        depPackage : /use\s+(.+);/
    },

    analyse = function (option) {
        var
            fileContent,
            packageResult,
            depsResult,
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
        function getDepPackage (str) {
            var packageName,
                result = re.depPackage.exec(str);
            if (result) {
                packageName = pastry.trim(result[1])
                    .replace('base ', '')
                    .replace('parent ', '');

                packageName = packageName.split(/\s/)[0]
                    .replace('qw(', '')
                    .replace('qw/', '')
                    .replace(/\'/g, '')
                    .replace(/\"/g, '')
                    .replace(/\s/g, '')
                    .replace(')', '');
            }
            if (
                !!packageName &&
                packageName.length > 0 &&
                pastry.indexOf([
                    'my'
                ], pastry.trim(packageName)) === -1 &&
                !packageName.match(/[^\w\:]/)
            ) {
                return packageName;
            }
        }

        utils.walkFiles(option.directory, function (file) {
            if (re.fileFilter.test(file)) {
                fileContent = fs.readFileSync(file).toString();
                packageResult = re.package.exec(fileContent);
                if (packageResult) {
                    node = packageResult[1];
                    addNodeById(node);

                    depsResult = fileContent.match(re.depsMatch);
                    pastry.each(depsResult, function (dep) {
                        dep = getDepPackage(dep);
                        if (dep) {
                            addNodeById(dep);
                            addLink(dep, node);
                        }
                    });
                }
            }
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
