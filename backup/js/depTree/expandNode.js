/* jshint strict: true, undef: true, unused: true */
/* global define */

define([
    './CONST',
    'pastry'
], function (
    CONST,
    pastry
) {
    'use strict';

    function run (instance) {
        /*
         * @description: 加上 helper 函数
         */

        pastry.extend(instance, {
            expandParent: function (id) {
                var filterNodes = [instance.nodeById[id]],
                    filterEdges = [];
                pastry.each(instance.edges, function (edge) {
                    if (edge.target === id) {
                        filterEdges.push(edge);
                        filterNodes.push(instance.nodeById[edge.source]);
                    }
                });
                instance
                    .addNodes(filterNodes)
                    .addEdges(filterEdges)
                    .draw();
                return instance;
            },
            expandChild: function (id) {
                var filterNodes = [instance.nodeById[id]],
                    filterEdges = [];
                pastry.each(instance.edges, function (edge) {
                    if (edge.source === id) {
                        filterEdges.push(edge);
                        filterNodes.push(instance.nodeById[edge.target]);
                    }
                });
                instance
                    .addNodes(filterNodes)
                    .addEdges(filterEdges)
                    .draw();
                return instance;
            },
            expandSelfOne: function (id) {
                instance
                    .expandParent(id)
                    .expandChild(id);
            }
        });
    }

    return {
        run: run
    };
});
