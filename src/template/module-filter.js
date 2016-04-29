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
        __p += '<div id="module-filter" class="pure-form">\n  <div class="query">\n    <input id="module-filter-query" class="pure-input-1" type="text" placeholder="' +
            ((__t = (localeMsg.module_filter_placeholder)) == null ? '' : __t) +
            '">\n  </div>\n  <div class="pure-menu pure-menu-scrollable">\n    <ul id="module-filter-result" class="pure-menu-list"></ul>\n  </div>\n</div>\n';;
        return __p;
    })(data.localeMsg);
};