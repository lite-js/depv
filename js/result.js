/* jshint strict: true, undef: true, unused: true */
/* global define, $, d3, dagreD3, pastry, CryptoJS, alert */

define('jquery', function () {
    'use strict';
    return $;
});
define('d3'       , d3       );
define('dagreD3'  , dagreD3  );
define('pastry'   , pastry   );
define('CryptoJS' , CryptoJS );

require([
    'jquery',
    './depTree'
], function (
    $,
    depTree
) {
    'use strict';

    $.ajaxSetup ({
        cache: false
    });
    $.get('json/resultTree.json', function(tree) {
        if (!tree.nodes || !tree.nodes.length) {
            // #13 bugfix 结果为空的时候不作进一步画图处理
            alert('no result!');
            return;
        }
        depTree.init(tree).draw(tree);
    });
});

