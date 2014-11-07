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

    var cacheColor     = {},
        cacheFontColor = {};

    function colorByType (type) {
        if (cacheColor[type]) {
            return cacheColor[type];
        }
        var colorNames = color.names,
            hash       = CryptoJS.SHA256('' + type),
            hex        = parseInt(hash.toString(), 16),
            randomId   = hex % colorNames.length;

        cacheColor[type] = color.colorByName[colorNames[randomId]];
        return cacheColor[type];
    }

    function fontColorByType (type) {
        if (cacheFontColor[type]) {
            return cacheFontColor[type];
        }
        var rectColor = cacheColor[type],
            greyColor = color.greyColor(rectColor),
            hex       = color.hexByCssColor(greyColor);

        if (hex > parseInt('7fffff.8', 16)) {
            cacheFontColor[type] = 'black';
        } else {
            cacheFontColor[type] = 'white';
        }
        return cacheFontColor[type];
    }

    return function (instance) {
        pastry.each(instance.d3NodeById, function(d3Node, id) {
            var node      = instance.nodeById[id],
                rectColor = colorByType(node.type),
                fontColor = fontColorByType(node.type),
                d3Rect    = d3Node.select('rect'),
                $label    = $(d3Node[0][0]).find('div.nodeLabel');

            if (d3Node) {
                d3Rect.attr('fill', rectColor);
            }
            if ($label) {
                $label.css('color', fontColor);
            }
        });
    };
});

