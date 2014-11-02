/* jshint strict: true, undef: true, unused: true */
/* global define */

define([
    './CONST',
    'd3',
    'dagreD3',
    'pastry'
    // 'jquery'
], function (
    CONST,
    d3,
    dagreD3,
    pastry
    // $
) {
    'use strict';

    function run (instance) {
        instance.draw = function (data) {
            /*
             * @description: 画图
             */
            if (!data) {
                data = {
                    nodes: instance.nodes,
                    edges: instance.edges
                };
            }
            var d3Svg = instance.d3Svg,
                graph = instance.graph = new dagreD3.Digraph();
            // 加 node {
                pastry.each(data.nodes, function(node) {
                    if (node.id) {
                        graph.addNode(node.id,  node);
                    }
                });
            // }
            // 加 edge {
                pastry.each(data.edges, function(edge) {
                    if (graph.hasNode(edge.source) && graph.hasNode(edge.target)) {
                        /*
                         * 过滤了不存在的节点的连线
                         */
                        if (!graph.hasEdge(edge.id)) {
                            graph.addEdge(edge.id, edge.source, edge.target);
                        }
                    }
                });
            // }
            // 画图 {
                var renderer = instance.render = new dagreD3.Renderer(),
                    oldDrawNodes = renderer.drawNodes(),
                    oldDrawEdges = renderer.drawEdgePaths();
            // }
            // 定制 node {
                renderer.drawNodes(function(graph, root) {
                    var svgNodes = oldDrawNodes(graph, root);
                    svgNodes.each(function(u) {
                        var d3Node = instance.d3NodeById[u] = d3.select(this),
                            node   = graph.node(u);
                        if (node.nodeclass) {
                            d3Node.classed(node.nodeclass, true);
                        }
                        d3Node.attr('id', CONST.NS.node + node.id);
                    });
                    return svgNodes;
                });
            // }
            // 定制 edge {
                renderer.drawEdgePaths(function(g, svg) {
                    var svgEdges = oldDrawEdges(g, svg),
                        d3Edge, edge;
                    svgEdges.each(function(e) {
                        d3Edge = instance.d3EdgeById[e] = d3.select(this);
                        edge = g.edge(e);
                        // d3Edge.attr('class', 'edge');
                        if (edge.edgeclass) {
                            d3Edge.classed(edge.edgeclass, true);
                        }
                    });
                    return svgEdges;
                });
            // }
            // zooming {
                instance.graphLayout = renderer
                    .layout(instance.layout)
                    .run(graph, d3Svg);

                var d3G = instance.d3G = d3Svg.select('g'),

                    zoomed = function () {
                        d3G
                            .attr(
                                'transform',
                                'translate(' + d3.event.translate + ')scale(' + d3.event.scale + ')'
                            );
                    };

                instance.zoom = d3.behavior.zoom()
                    .scaleExtent([0.2, 2])
                    .on('zoom', zoomed);
                d3Svg.call(instance.zoom);
            // }
            // 居中 {
                instance.transition(instance.getCenterXY());
            // }
        };
    }

    return {
        run: run
    };
});

