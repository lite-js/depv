/* jshint strict: true, undef: true, unused: true */
/* global define */

define([
    'd3',
    'dagreD3',
    'jquery',
    'pastry',
    './depTree/bugfix',
    './depTree/contextMenu',
    './depTree/expandNode',
    './depTree/filter',
    './depTree/helper',
    './depTree/namespace',
    './depTree/process',
    './depTree/draw',
    './depTree/toolTip',
    './depTree/transition'
], function(
    d3,
    dagreD3,
    $,
    pastry,
    bugfix,
    contextMenu,
    expandNode,
    filter,
    helper,
    namespace,
    process,
    draw,
    toolTip,
    transition
) {
    'use strict';
    /*
     * @author      : 绝云(wensen.lws@alibaba-inc.com)
     * @description : 画图
     */

    var depTree = {
        init: function (tree) {
            var instance = this;

            pastry.extend(instance, {
                $canvas    : $('#canvas'),
                d3EdgeById : {},
                d3NodeById : {},
                d3Svg      : d3.select('svg'),
                graph      : null,
                renderer   : new dagreD3.Renderer(),
                zoom       : null,
                layout: dagreD3.layout()
                    .nodeSep(40)
                    .rankSep(120)
                    .rankDir('TB'),

            }, tree);

            process.run(instance);
            draw.run(instance);
            transition.run(instance);
            filter.run(instance);
            namespace.run(instance);
            helper.run(instance);
            expandNode.run(instance);
            toolTip.run(instance);
            contextMenu.run(instance);
            bugfix.run(instance);
            return instance;
        }
    };

    return depTree;
});

