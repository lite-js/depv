/* jshint strict: true, undef: true, unused: true */
/* global define */

define([
    'pastry'
    // 'jquery'
], function (
    pastry
    // $
) {
    'use strict';

    function run (instance) {
        instance.getCenterXY = function (scale) {
            /*
             * @description: 获取图的中心点
             */
            var zoomScale = scale || instance.zoom.scale(),
                $canvas   = instance.$canvas,
                xCenterOffset = (
                    $canvas.width() -
                    instance.graphLayout.graph().width  * zoomScale
                ) / 2,
                yCenterOffset = (
                    $canvas.height() -
                    instance.graphLayout.graph().height * zoomScale
                ) / 2;

            return {
                x: xCenterOffset,
                y: yCenterOffset
            };
        };

        instance.transition = function (option) {
            /*
             * @description : 图形变换
             * @parameter   : {Number} x, x
             * @parameter   : {Number} y, y
             * @parameter   : {Number} scale, 缩放倍数
             * @parameter   : {Number} duration, 动画持续时间
             */
            var
                x        = option.x,
                y        = option.y,
                scale    = option.scale    || 1,
                duration = option.duration || 300;

            if (pastry.every([
                x,
                y,
                scale,
                duration
            ], function (num) {
                return pastry.isNumber(num);
            })) {
                instance.d3G
                    .transition()
                    .duration(duration)
                    .attr(
                        'transform',
                        'translate(' + x + ', ' + y + ')scale(' + scale + ')'
                    );
                // 要更新d3.event里缓存的scale和translate, 否则有跳动的问题 {
                    instance.zoom.translate([x, y]);
                    instance.zoom.scale(scale);
                // }
            }
        };
    }

    return {
        run: run
    };
});

