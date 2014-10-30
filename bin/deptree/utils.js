/* jshint strict: true, undef: true, unused: true, node: true */
// /* global */

'use strict';
/*
 * @author      : 绝云
 * @description : utils
 */

var fs = require('fs'),
    pastry = require('pastry');

function findCircles (graph) {
    /*
     * TODO tarjan implement
     */
    var nodes = graph.nodes,
        edges = graph.edges;
}

function walkFiles (path, processFile) {
    var dirList = fs.readdirSync(path);

    pastry.each(dirList, function(item){
        if (fs.statSync(path + '/' + item).isFile()){
            processFile(path + '/' + item);
        } else if (fs.statSync(path + '/' + item).isDirectory()){
            walkFiles(path + '/' + item, processFile);
        }
    });
}


module.exports = {
    findCircles : findCircles,
    walkFiles   : walkFiles
};
