/* jshint strict: true, undef: true, unused: true */
/* global define */

define([
    'pastry'
], function (
    pastry
) {
    'use strict';

    function classByType (/* type */) {
        // if (!type) {
        //     return 'type-default';
        // }
        // switch (true) {
        //     case /^pastry/.test(type):
        //         return 'type-core';
        //     case /^amd/.test(type):
        //         return type === 'amd/define' ? 'type-default' : 'type-core';
        //     case /shim\//.test(type):
        //         return 'type-common';
        //     case /fmt\//.test(type):
        //         return 'type-common';
        //     default:
        //         return 'type-default';
        // }
        return '';
    }

    function processNodes (nodes) {
        pastry.each(nodes, function(node) {
            pastry.extend(node, {
                label     : '<div class="nodeLabel">' + node.name + '</div>',
                rx        : 3,
                ry        : 3,
                nodeclass : classByType(node.type)
            });
        });
    }
    function processEdges (/* edges */) {
        // console.log(edges);
    }

    function run (instance) {
        processNodes(instance.nodes);
        processEdges(instance.edges);
        pastry.extend(instance, {
            nodeById: {},
            edgeById: {}
        });
        pastry.each(instance.nodes, function (node) {
            instance.nodeById[node.id] = node;
        });
        pastry.each(instance.edges, function (edge) {
            instance.edgeById[edge.id] = edge;
        });
    }

    return {
        run: run
    };
});
