/* jshint strict: true, undef: true, unused: true */
/* global define, window */

define([
    'jquery',
], function (
    $
) {
    'use strict';

    function run (instance) {
        var fullScreenHeight = $(window).height(),
            $namespaces = instance.$namespaces;

        // 修正 safari 高度的 bug {
            $('body').height(fullScreenHeight);
            instance.d3Svg.attr('height', fullScreenHeight);
        // }
        // 固定高度的 bug {
            if ($namespaces.height() + 100 > fullScreenHeight) {
                $namespaces.height($('#right-panel').height() - 100);
            }
        // }
    }

    return {
        run: run
    };
});
