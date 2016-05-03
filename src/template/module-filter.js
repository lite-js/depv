module.exports = function(data, helper) {
    data = data || {};
    helper = helper || {};
    var __t;
    var __p = '';
    var __j = Array.prototype.join;
    var print = function() {
        __p += __j.call(arguments, '');
    };
    return (function(localeMsg) {
        __p += '<li id="module-filter" class="pure-menu-item pure-menu-has-children pure-menu-allow-hover">\n  <input id="module-filter-query" class="pure-menu-link" type="text" placeholder="' +
            ((__t = (localeMsg.module_filter_placeholder)) == null ? '' : __t) +
            '">\n  <ul id="module-filter-result" class="pure-menu-children"></ul>\n</li>\n';;
        return __p;
    })(data.localeMsg);
};