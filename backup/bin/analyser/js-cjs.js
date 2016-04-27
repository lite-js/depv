/* jshint strict: true, undef: true, unused: true, node: true */
// /* global */
"use strict";

var
    nodes      = [],
    edges      = [],
    nodeLoaded = {},

    pastry = require('pastry'),
    madge  = require('madge');

// 私有函数 {
    function addNodeById (id) {
        if (!nodeLoaded[id]) {
            nodes.push({
                id   : id,
                name : id
            });
            nodeLoaded[id] = true;
        }
    }
// }

var analyse = function(option) {
    // 获取分析结果 {
        var madgeObj = madge(option.directory, {
                exclude           : option.ignore,
                format            : 'cjs',
                mainRequireModule : option.mainModule,
                requireConfig     : option.requireConfig,
            }),

            depTree  = madgeObj.tree,
            circular = madgeObj.circular(),
            ids      = pastry.keys(depTree);
    // }
    // 生成 graph 数据 {
        ids = pastry.keys(depTree);
        pastry.each(ids, function(id) {
            addNodeById(id);
        });
        pastry.each(depTree, function(deps, id) {
            pastry.each(deps, function(dep) {
                dep = dep.replace(/\.\.\//g, '');
                addNodeById(dep);
                edges.push({
                    id    : 'S' + dep + 'T' + id,
                    source: dep,
                    target: id
                });
            });
        });
    // }
    // 返回结果 {
        return {
            nodes     : nodes,
            edges     : edges,
            circles   : circular.getArray(),
            seperator : option.seperator || '/'
        };
    // }
};

module.exports = {
    analyse: analyse
};

