/* jshint strict: true, undef: true, unused: true */
/* global define, console */

define([
    'pastry'
], function (
    pastry
) {
    'use strict';

    function classById (id) {
        switch (true) {
            case /^pastry/.test(id):
                return 'type-core';
            case /^amd/.test(id):
                return id === 'amd/define' ? 'type-default' : 'type-core';
            case /shim\//.test(id):
                return 'type-common';
            case /fmt\//.test(id):
                return 'type-common';
            default:
                return 'type-default';
        }
    }

    function processNodes (nodes) {
        pastry.each(nodes, function(node) {
            pastry.extend(node, {
                label     : '<div class="nodeLabel">' + node.name + '</div>',
                rx        : 3,
                ry        : 3,
                nodeclass : classById(node.id)
            });
        });
    }
    function processEdges (edges) {
        console.log(edges);
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
