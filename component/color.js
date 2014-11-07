/* jshint strict: true, undef: true, unused: true */
/* global define */

define([
    'pastry',
    './color/names'
    // 'jquery'
], function (
    pastry,
    names
    // $
) {
    'use strict';
    /*
     * @author      : 绝云
     * @date        : 2014-11-07
     * @description : color 相关
     */
    function completeColorHex (hex) {
        if (hex.length === 6) {
            return hex;
        }
        while(hex.length < 6) {
            hex = '0' + hex;
        }
        return hex;
    }

    var
        colorPrefix = '#',
        maxColorHex = parseInt('ffffff', 16),

        cssColorByHex = function (hex) {
            return colorPrefix + completeColorHex(hex);
        },

        hexByCssColor = function (color) {
            return parseInt(color.replace(colorPrefix, ''), 16);
        },

        oppositeColor = function (color) {
            var hex = hexByCssColor(color);

            return cssColorByHex((maxColorHex - hex).toString(16));
        },

        colorByName = (function () {
            var result = {};
            pastry.each(names, function (value, key) {
                result[key] = cssColorByHex(value);
            });
            return result;
        }());

    var color = {
        colorByName   : colorByName,
        names         : pastry.keys(names),
        oppositeColor : oppositeColor
    };

    return color;
});
