/* jshint strict: true, undef: true, unused: true */
/* global define */

define([
    './CONST',
    'pastry'
], function (
    CONST,
    pastry
) {
    'use strict';

    function run (instance) {
        /*
         * @description: 加上 helper 函数
         */
        pastry.extend(instance, {
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
