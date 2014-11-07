/* jshint strict: true, undef: true, unused: true */
/* global define */

define([
    './CONST',
    './stylingEdges',
    './stylingNodes',
    'd3',
    'dagreD3',
    'pastry'
], function (
    CONST,
    stylingEdges,
    stylingNodes,
    d3,
    dagreD3,
    pastry
) {
    'use strict';

    function run (instance) {
        instance.draw = function (data) {
            /*
             * @description: 画图
             */

            var d3Svg        = instance.d3Svg,
                graph        = instance.graph,
                renderer     = instance.renderer,
                oldDrawNodes = renderer.drawNodes(),
                oldDrawEdges = renderer.drawEdgePaths();


            if (data && pastry.isArray(data.nodes)) {
                // 清除旧图 {
                    graph = instance.graph = new dagreD3.Digraph();
                // }
                // 加 nodes {
                    instance.addNodes(data.nodes);
                // }
                // 加 edges {
                    instance.addEdges(data.edges);
                // }
            }

            // 定制 node {
                renderer.drawNodes(function(g, root) {
                    var svgNodes = oldDrawNodes(g, root);
                    svgNodes.each(function(u) {
                        var d3Node = instance.d3NodeById[u] = d3.select(this),
                            node   = g.node(u);
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

            // 定制 node {
                stylingNodes(instance);
            // }
            // 定制 edge {
                stylingEdges(instance);
            // }

            // 居中 {
                instance.transition(pastry.extend({
                    duration: 0
                }, instance.getCenterXY()));
            // }
        };
    }

    return {
        run: run
    };
});

