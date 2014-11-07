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

    function cssColorByHex (hex) {
       return colorPrefix + completeColorHex(hex);
    }
    function completeColorHex (hex) {
        if (hex.length === 6) {
            return hex;
        }
        while(hex.length < 6) {
            hex = '0' + hex;
        }
        return hex;
    }
    function hexByCssColor (color) {
        return parseInt(color.replace(colorPrefix, ''), 16);
    }
    function oppositeColor (color) {
        var hex = hexByCssColor(color);

        return cssColorByHex((maxColorHex - hex).toString(16));
    }
    function hex2RGB (hex) {
        hex = completeColorHex(hex.toString(16));
        return {
            R: parseInt(hex.substr(0, 2), 16),
            G: parseInt(hex.substr(2, 2), 16),
            B: parseInt(hex.substr(4, 2), 16)
        };
    }
    function greyColor (color) {
        var hex = hexByCssColor(color),
            rgb = hex2RGB(hex),
            average = Math.floor((rgb.R + rgb.G + rgb.B) / 3);

        return cssColorByHex(
            average.toString(16) +
            average.toString(16) +
            average.toString(16)
        );
    }

    var
        colorPrefix = '#',
        maxColorHex = parseInt('ffffff', 16),

        colorByName = (function () {
            var result = {};
            pastry.each(names, function (value, key) {
                result[key] = cssColorByHex(value);
            });
            return result;
        }());

    return {
        colorByName   : colorByName,
        cssColorByHex : cssColorByHex,
        greyColor     : greyColor,
        hexByCssColor : hexByCssColor,
        names         : pastry.keys(names),
        oppositeColor : oppositeColor
    };
});
