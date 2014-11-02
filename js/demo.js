
define('jquery', function () {
    return $;
});
define('d3'      , d3      );
define('dagreD3' , dagreD3 );
define('pastry'  , pastry  );

require([
    'jquery',
    './depTree'
], function (
    $,
    depTree
) {
    $.ajaxSetup ({
        cache: false
    });
    $.get('json/demoTree.json', function(tree) {
        depTree.init(tree).draw(tree);
    });
});

