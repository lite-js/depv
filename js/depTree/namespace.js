/* jshint strict: true, undef: true, unused: true */
/* global define */

define([
    '../../component/fmt/sprintf',
    'pastry',
    'jquery'
], function (
    sprintf,
    pastry,
    $
) {
    'use strict';

    function run (instance) {
        var id,
            result = [],
            $namespaces = $('#namespaces'),
            seperator = instance.seperator || '/';

        instance.$namespaces = $namespaces;
        $namespaces.html('');
        pastry.each(instance.nodes, function(node) {
            id = node.id;
            if (pastry.isString(id)) {
                result.push(id.split(seperator)[0]);
            }
        });
        $namespaces.append(
            '<span data-ns="all" class="namespace" title="all">all</span>'
        );
        pastry.each(pastry.uniq(result).sort(function (a, b) {
            var alc = pastry.lc(a),
                blc = pastry.lc(b);
            return alc > blc ? 1 : alc < blc ? -1 : 0;
        }), function(NS) {
            $namespaces.append(
                sprintf('<span data-ns="%s" class="namespace" title="%s">%s</span>',
                    NS,
                    NS,
                    NS
                )
            );
        });

        $namespaces.on('click', '.namespace', function() {
            var $btn = $(this),
                ns = $btn.data('ns'),
                filteredNodes = [];
            if (ns === 'all') {
                filteredNodes = instance.nodes;
            } else {
                filteredNodes = pastry.filter(instance.nodes, function(node) {
                    return node.id.indexOf(ns) === 0;
                });
            }
            instance.draw({
                nodes: filteredNodes,
                edges: instance.edges
            });
        });
    }

    return {
        run: run
    };
});
