/* jshint strict: true, undef: true, unused: true */
/* global define */

define([
    './CONST',
    '../../component/color',
    'CryptoJS',
    'd3',
    'jquery',
    'pastry'
], function (
    CONST,
    color,
    CryptoJS,
    d3,
    $,
    pastry
) {
    'use strict';

    var cache = {};

    function colorByType (type) {
        if (cache[type]) {
            return cache[type];
        }
        var colorNames = color.names,
            hash       = CryptoJS.SHA256('' + type),
            hex        = parseInt(hash.toString(), 16),
            randomId   = hex % colorNames.length;

        cache[type] = color.colorByName[colorNames[randomId]];
        return cache[type];
    }

    return function (instance) {
        pastry.each(instance.d3NodeById, function(d3Node, id) {
            var node      = instance.nodeById[id],
                rectColor = colorByType(node.type),
                d3Rect    = d3Node.select('rect'),
                $label    = $(d3Node[0][0]).find('div.nodeLabel');

            if (d3Node) {
                d3Rect.attr('fill', rectColor);
            }
            if ($label) {
                $label.css('color', color.oppositeColor(rectColor));
            }
        });
    };
});

