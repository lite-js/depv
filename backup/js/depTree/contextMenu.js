/* jshint strict: true, undef: true, unused: true */
/* global define, console */

define([
    // 'pastry',
    'jquery'
], function (
    // pastry,
    $
) {
    'use strict';

    function run (instance) {
        $.contextMenu({
            selector: 'g.node',
            items: {
                viewSelfOne: {
                    name: '查看单层父子依赖',
                    callback: function (key, opt) {
                        instance.expandSelfOne(instance.getIdFromNode(opt.$trigger));
                    }
                },
                // viewSelfAll: {
                //     name: '查看所有父子依赖',
                //     callback: function (key, opt) {
                //         instance.expandSelfAll(instance.getIdFromNode(opt.$trigger));
                //     }
                // },
                sep1: '---------',
                expandParent: {
                    name: '查看单层父依赖',
                    callback: function (key, opt) {
                        instance.expandParent(instance.getIdFromNode(opt.$trigger));
                    }
                },
                // expandParents: {
                //     name: '查看所有父依赖',
                //     callback: function (key, opt) {
                //         instance.expandParentAll(instance.getIdFromNode(opt.$trigger));
                //     }
                // },
                sep2: '---------',
                expandChild: {
                    name: '查看单层子依赖',
                    callback: function (key, opt) {
                        instance.expandChild(instance.getIdFromNode(opt.$trigger));
                    }
                }
                // expandChildren: {
                //     name: '查看所有子依赖',
                //     callback: function (key, opt) {
                //         instance.expandChildren(instance.getIdFromNode(opt.$trigger));
                //     }
                // }
            }
        });
    }

    return {
        run: run
    };
});
