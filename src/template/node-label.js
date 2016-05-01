module.exports = function(data, helper) {
    data = data || {};
    helper = helper || {};
    var __t;
    var __p = '';
    var __j = Array.prototype.join;
    var print = function() {
        __p += __j.call(arguments, '');
    };
    return (function(name) {
        __p += '<div class="node-label">' +
            ((__t = (name)) == null ? '' : __t) +
            '</div>\n';;
        return __p;
    })(data.name);
};