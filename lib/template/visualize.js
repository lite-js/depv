module.exports = function(data, helper) {
    data = data || {};
    helper = helper || {};
    var __t;
    var __p = '';
    var __j = Array.prototype.join;
    var print = function() {
        __p += __j.call(arguments, '');
    };
    return (function(config) {
        __p += '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <title>visualizing the project</title>\n    <link rel="stylesheet" href="dist/page-loading.css">\n</head>\n<body>\n<div id="app"></div>\n<script>\n    var CONFIG = JSON.parse(\'' +
            ((__t = (config)) == null ? '' : __t) +
            '\');\n</script>\n<script src="dist/page-loading.js"></script>\n</body>\n</html>';;
        return __p;
    })(data.config);
};