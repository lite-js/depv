/* jshint strict: true, undef: true, unused: true */
/* global define */

define([
    'pastry',
    'jquery'
], function (
    pastry,
    $
) {
    'use strict';

    function run (instance) {
        instance.$filter = $('input#module-q');

        instance.filterNodes = function (q, callback) {
            if (!pastry.isString(q)) {
                return instance;
            }
            var filterNodes = pastry.filter(instance.nodes, function (node) {
                var pattern = pastry.lc(instance.$filter.val()),
                    nodeId  = pastry.lc(node.id);
                return new RegExp(pattern).test(nodeId);
            });
            callback(filterNodes);
            return instance;
        };

        instance.$filter.change(function () {
            instance.filterNodes($(this).val(), function (nodes) {
                instance.draw({
                    nodes: nodes,
                    edges: instance.edges
                });
            });
        });
    }

    return {
        run: run
    };
});
