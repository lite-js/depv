/* jshint strict: true, undef: true, unused: true */
/* global define, document */

define([
    '../../component/toolTip',
    // './CONST',
    // 'pastry',
    'jquery'
], function (
    toolTip,
    // CONST,
    // pastry,
    $
) {
    'use strict';

    function run (instance) {
        /*
         * @description: 加上 toolTip
         */
        var $svg = $('svg'),
            $toolTarget,
            targetNode;

        $svg.on('mouseover', '.node', function(e){
            if (e.target.nodeName.toUpperCase() !== 'G') {
                $toolTarget = $($(e.target).parents('.node')[0]);
            } else {
                return;
            }
            targetNode = instance.queryNode({
                id: instance.getIdFromNode($toolTarget)
            });
            toolTip.show(
                targetNode.name,
                $toolTarget[0], {
                    offset: -$(document).scrollTop() + 6
                }
            );
        });
        $svg.on('mouseout', '.node', function() {
            toolTip.hide();
        });
        return instance;
    }

    return {
        run: run
    };
});
