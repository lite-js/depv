
/* jshint strict: true, undef: true, unused: true */
/* global define, d3, dagreD3, $, document */

define('drawDepTree', [
    'pastry'
], function(
    pastry
) {
    'use strict';
    /*
     * @author      : 绝云(wensen.lws@alibaba-inc.com)
     * @description : 画图
     */

    var
        // 缩放相关 {
            zoom,
        // }
        // 画图相关 {
            g,
            svg = d3.select('svg'),
            graphData = {
                nodes: [],
                edges: []
            },
            layout = dagreD3.layout()
                .nodeSep(40)
                .rankSep(120)
                .rankDir('TB');
        // }

    // bug in safari {
        $('body').height($(document).height());
        svg.attr('height', $('body').height());
    // }

    function svgTranslate (graph, option) {
        /*
         * @description : 图形变换
         * @parameter   : {Number} x, x
         * @parameter   : {Number} y, y
         * @parameter   : {Number} scale, 缩放倍数
         * @parameter   : {Number} duration, 动画持续时间
         */
        var x        = option.x,
            y        = option.y,
            scale    = option.scale || 1,
            duration = pastry.isNumber(option.duration) ?
                option.duration : 300;

        if (pastry.isNumber(x) && pastry.isNumber(y)) {
            graph
                .transition()
                .duration(duration)
                .attr(
                    'transform',
                    'translate(' + x + ', ' + y + ')scale(' + scale + ')'
                );
            // 图在自动定位后要更新 d3.event 里缓存了的 scale 和 translate，否则会有跳动的问题 {
                zoom.translate([x, y]);
                zoom.scale(scale);
            // }
        }
    }

    function classById (id) {
        switch (true) {
            case /^pastry/.test(id):
                return 'type-core';
            case /^amd/.test(id):
                return id === 'amd/define' ? 'type-default' : 'type-core';
            case /shim\//.test(id):
                return 'type-common';
            case /fmt\//.test(id):
                return 'type-common';
            default:
                return 'type-default';
        }
    }

    function processNodes (nodes) {
        pastry.each(nodes, function(node) {
            pastry.extend(node, {
                label     : '<div>' + node.name + '</div>',
                rx        : 3,
                ry        : 3,
                nodeclass : classById(node.id)
            });
        });
    }

    function draw (graph) {
        /*
         * @description: 画图
         */
        g = new dagreD3.Digraph();
        // 加 node {
            pastry.each(graph.nodes, function(node) {
                if (node.id) {
                    g.addNode(node.id,  node);
                }
            });
        // }
        // 加 edge {
            pastry.each(graph.edges, function(edge) {
                if (g.hasNode(edge.source) && g.hasNode(edge.target)) {
                    /*
                     * 过滤了不存在的节点的连线
                     */
                    if (!g.hasEdge(edge.id)) {
                        g.addEdge(edge.id, edge.source, edge.target);
                    }
                }
            });
        // }
        // 画图 {
            var renderer     = new dagreD3.Renderer(),
                oldDrawNodes = renderer.drawNodes();
        // }
        // 定制 node {
            renderer.drawNodes(function(graph, root) {
                var svgNodes = oldDrawNodes(graph, root);
                svgNodes.each(function(u) {
                    d3.select(this).classed(graph.node(u).nodeclass, true);
                });
                return svgNodes;
            });
        // }
        // zooming {
            var graphLayout = renderer
                    .layout(layout)
                    .run(g, d3.select('svg')),
                zoomed = function () {
                    svg.select('g')
                        .attr(
                            'transform',
                            'translate(' + d3.event.translate + ')scale(' + d3.event.scale + ')'
                        );
                };
            zoom = d3.behavior.zoom()
                .scaleExtent([0.2, 3])
                .on('zoom', zoomed);
            svg.call(zoom);
        // }
        // 居中 {
            svgTranslate(svg.select('g'), {
                x: (($('#canvas').width()  - graphLayout.graph().width)  / 2),
                y: (($('#canvas').height() - graphLayout.graph().height) / 2),
            });
        // }
    }
    function initNamespaces () {
        var id,
            result = [],
            $namespaces = $('#namespaces'),
            seperator = graphData.seperator || '/';

        $namespaces.html('');
        pastry.each(graphData.nodes, function(node) {
            id = node.id;
            if (pastry.isString(id)) {
                result.push(id.split(seperator)[0]);
            }
        });
        $namespaces.append('<button data-ns="all" class="namespace">all</button>');
        pastry.each(pastry.uniq(result), function(NS) {
            $namespaces.append('<button data-ns="' + NS + '" class="namespace">' + NS + '</button>');
        });
    }
    function bindEvents () {
        $('div#namespaces').on('click', 'button.namespace', function() {
            var $btn = $(this),
                ns = $btn.data('ns'),
                filteredNodes = [];
            if (ns === 'all') {
                filteredNodes = graphData.nodes;
            } else {
                filteredNodes = pastry.filter(graphData.nodes, function(node) {
                    return node.id.indexOf(ns) === 0;
                });
            }
            draw({
                nodes: filteredNodes,
                edges: graphData.edges
            });
        });
        $('input#module-q').keyup(function () {
            var $input = $(this),
                filteredNodes = pastry.filter(graphData.nodes, function (node) {
                    return node.id.indexOf($input.val()) > -1;
                });
            draw({
                nodes: filteredNodes,
                edges: graphData.edges
            });
        });
    }

    return function (tree) {
        // 备份图数据 {
            graphData = tree;
            processNodes(graphData.nodes);
        // }
        // 生成 namespaces 菜单 {
            initNamespaces();
            bindEvents();
        // }
        // 画图 {
            draw(graphData);
        // }
    };
});

