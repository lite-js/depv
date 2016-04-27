/* jshint strict: true, undef: true, unused: true */
/* global define */

define([
    './CONST',
    'pastry',
    'jquery'
], function (
    CONST,
    pastry,
    $
) {
    'use strict';

    function run (instance) {
        /*
         * @description: 加上 helper 函数
         */

        pastry.extend(instance, {
            getIdFromNode: function (node) {
                return $(node).attr('id').replace(CONST.NS.node, '');
            },
            addNodes: function (nodes) {
                /*
                 * @description : 添加节点
                 * @parameter   : {Array} nodes, 待添加节点
                 */
                var graph = instance.graph;

                pastry.each(nodes, function(node) {
                    if (node.id && !graph.hasNode(node.id)) {
                        graph.addNode(node.id,  node);
                    }
                });
                return instance;
            },
            addEdges: function (edges) {
                /*
                 * @description : 添加连线
                 * @parameter   : {Array} edges, 待添加连线
                 */
                var graph = instance.graph;

                pastry.each(edges, function(edge) {
                    if (graph.hasNode(edge.source) && graph.hasNode(edge.target)) {
                        /*
                         * 过滤了不存在的节点的连线
                         */
                        if (!graph.hasEdge(edge.id)) {
                            graph.addEdge(edge.id, edge.source, edge.target);
                        }
                    }
                });
                return instance;
            },
            queryNode: function (query) {
                /*
                 * @description : 搜索节点
                 * @parameter   : {Object} node, 搜索参数
                 */
                var node;

                if (query.id) {
                    node = instance.nodeById[query.id];
                } else if (query.name) {
                    pastry.some(instance.nodes, function (n) {
                        if (n.name === query.name) {
                            node = n;
                            return true;
                        }
                        return false;
                    });
                }
                return node;
            },
            queryNodes: function (query) {
                /*
                 * @description : 搜索所有符合条件的节点
                 * @parameter   : {Object} node, 搜索参数
                 */
                var nodes = [];

                if (query.id) {
                    if(instance.nodeById[query.id]){
                        nodes.push(instance.nodeById[query.id]);
                    }
                } else if (query.name) {
                    pastry.each(instance.nodes, function (n) {
                        if (n.name === query.name) {
                            nodes.push(n);
                        }
                    });
                }

                if(nodes.length === 0){
                    nodes = null;
                }
                return nodes;
            },
            queryD3Node: function (query) {
                /*
                 * @description : 搜索节点
                 * @parameter   : {Object} node, 搜索参数
                 */
                var node = instance.queryNode(query);

                return (node && node.id) ? instance.d3NodeById[node.id] : null;
            }
        });
    }

    return {
        run: run
    };
});
