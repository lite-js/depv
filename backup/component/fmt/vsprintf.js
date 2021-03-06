/* jshint strict: true, undef: true, unused: true */
/* global define */
define([
    'pastry',
    './sprintf'
], function(
    pastry,
    sprintf
) {
    'use strict';
    /*
     * @author      : 绝云(wensen.lws@alibaba-inc.com)
     * @date        : 2014-10-29
     * @description : fmt 模块 - vsprintf
     */

    var vsprintf = function(fmt, argv) {
        argv.unshift(fmt);
        return sprintf.apply(null, argv);
    };

    pastry.mixin({
        vsprintf: vsprintf
    });
    return vsprintf;
});
