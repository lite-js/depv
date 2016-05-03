module.exports = function(data, helper) {
    data = data || {};
    helper = helper || {};
    var __t;
    var __p = '';
    var __j = Array.prototype.join;
    var print = function() {
        __p += __j.call(arguments, '');
    };
    return (function(nodes) {
        __p += '';
        helper.each(nodes, function(node) {
            __p += '\n  <li class="pure-menu-item" ';
            if (node.id) {
                __p += 'data-id="' +
                    ((__t = (node.id)) == null ? '' : __t) +
                    '"';
            }
            __p += '>\n    <span class="pure-menu-link">' +
                ((__t = (node.name)) == null ? '' : __t) +
                '</span>\n  </li>\n';
        });
        __p += '\n';;
        return __p;
    })(data.nodes);
};