/* jshint strict: true, undef: true, unused: true */
/* global define, document */

define([
    'pastry',
    'jquery'
], function (
    pastry,
    $
) {
    'use strict';
    /*
     * @author      : 绝云
     * @date        : 2014-07-30
     * @description : 自定义toolTip
     * @syntax      : toolTip.show(text, node, opt); toolTip.hide();
    //     toolTip.show('some tips', $node, {
    //         gravity : 's',   // 方向
    //             // gravity:
    //             // ---------------
    //             // | nw | n | ne |
    //             // ---------------
    //             // | w  |   | e  |
    //             // ---------------
    //             // | sw | s | se |
    //             // ---------------
    //         html    : false, // 显示内容是否是 html
    //         offset  : 10     // 偏移量
    //     });
    //     toolTip.hide();
     */

    var ToolTip = function () {
            var instance = this;

            instance._init();
            return instance;
        };

    ToolTip.prototype = {
        _init: function () {
            var instance = this,
                wrapNode;

            pastry.extend(instance, {
                opt: {
                   gravity: 's', // 方向参数
                   html: false   // 是否使用 html
                },
                wrapHTML: [
                    '<div class="toolTip">',
                        '<div class="toolTip-arrow"></div>',
                        '<div class="toolTip-inner"></div>',
                    '</div>'
                ].join('')
            });
            wrapNode = instance.wrapNode = $(instance.wrapHTML).get(0);
            $(document.body).append(wrapNode);
            instance.wrapArrow   = wrapNode.children[0];
            instance.wrapContent = wrapNode.children[1];
            instance.hide();
            return instance;
        },

        show: function (text, node, opt) {
            /*
             * @description : 显示 toolTip
             * @syntax      : toolTip.show(text, node, opt);
             * @param       : {string } text , 要显示的 toolTip 内容
             * @param       : {domNode} node , 要显示 toolTip 的节点
             * @param       : {object } opt  , 显示 toolTip 的参数
             *     opt.gravity : 方向
             *     opt.html    : toolTip 是否是 html
             *     opt.offset  : toolTip 显示偏移量
             */
            var instance = this,
                wrapNode    = instance.wrapNode,
                wrapContent = instance.wrapContent,
                showOpt = pastry.extend({}, instance.opt, opt),
                gravity = showOpt.gravity,
                contentNode,
                nPos,
                tPos;

            // 插入内容 {
                if (text && text !== ''){
                    wrapContent.innerHTML = '';
                    if (showOpt.html) {
                        contentNode = $(text).get(0);
                        $(wrapContent).html('').append(contentNode);
                    } else {
                        wrapContent.innerHTML = text;
                    }
                }
            // }
            // 显示 {
                instance.wrapArrow.className =
                    'toolTip-arrow toolTip-arrow-' + gravity.charAt(0);
                wrapNode.className = 'toolTip';

                $(wrapNode).addClass('toolTip-' + gravity);
                if (showOpt.className) {
                    $(wrapNode).addClass('toolTip-' + showOpt.className);
                }
                $(instance.wrapNode).show();
            // }

            // 获取位置信息 {
                nPos = pastry.extend({}, node.getBoundingClientRect(), {
                    width  : node.offsetWidth,
                    height : node.offsetHeight
                });

                // svg处理，解决矢量图放大缩小后坐标不正确问题 {
                    if (typeof node.nearestViewportElement == 'object') {
                        // SVG
                        var rect = node.getBoundingClientRect();
                        nPos.width = rect.width;
                        nPos.height = rect.height;
                    }
                // }
                tPos = {
                    width  : wrapContent.offsetWidth,
                    height : wrapContent.offsetHeight
                };
                showOpt.offset = showOpt.offset || 0;
                switch (gravity.charAt(0)) {
                    case 'n':
                        tPos = {
                            top  : nPos.top + nPos.height + showOpt.offset,
                            left : nPos.left + nPos.width/2 - tPos.width/2
                        };
                        break;
                    case 's':
                        tPos = {
                            top  : nPos.top - tPos.height - showOpt.offset,
                            left : nPos.left + nPos.width/2 - tPos.width/2
                        };
                        break;
                    case 'e':
                        tPos = {
                            top  : nPos.top + nPos.height/2 - tPos.height/2,
                            left : nPos.left - tPos.width - showOpt.offset
                        };
                        break;
                    case 'w':
                        tPos = {
                            top  : nPos.top + nPos.height/2 - tPos.height/2,
                            left : nPos.left + tPos.width + showOpt.offset
                        };
                        break;
                }
                // 加上滚动量 {
                    tPos.top  += document.body.scrollTop;
                    tPos.left += document.body.scrollLeft;
                //
                if (gravity.length === 2) {
                    if (gravity.charAt(1) === 'w') {
                        tPos.left = nPos.left + nPos.width/2 - 15;
                    } else {
                        tPos.left = nPos.left + nPos.width/2 - tPos.width + 15;
                    }
                }
            // }
            // 定位 {
                pastry.each(tPos, function (value, key) {
                    $(wrapNode).css(key, value + 'px');
                });
            // }

            return instance;
        },

        hide: function () {
            /*
             * @description : 隐藏 toolTip
             * @syntax      : toolTip.hide();
             */
            var instance = this;

            $(instance.wrapNode).hide();
            return instance;
        }
    };

    return new ToolTip();
});
