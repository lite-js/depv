/* jshint strict: true, undef: true, unused: true */
/* global define, document */

define([
    '../../component/toolTip',
    './CONST',
    // 'pastry',
    'jquery'
], function (
    toolTip,
    CONST,
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

console.log($svg);

        $svg.on('mouseover', '.node', function(e){
            if (e.target.nodeName.toUpperCase() !== 'G') {
                $toolTarget = $($(e.target).parents('.node')[0]);
            } else {
                return;
            }
console.log($toolTarget);
            targetNode = instance.queryNode({
                id: $toolTarget.attr('id').replace(CONST.NS.node, '')
            });
console.log(targetNode);
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
