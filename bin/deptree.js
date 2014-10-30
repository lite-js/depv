#!/usr/bin/env node
// !!!!! WARNING ONLY works on OS X with Chrome.app installed !!!!!
/* jshint strict: true, undef: true, unused: true, node: true */
// /* global */

'use strict';
/*
 * @author      : 绝云
 * @description : 分析项目的依赖情况，并图形化显示
 * @syntax      : 在 bin 文件夹所在的父文件夹中 ./bin/dependencyTree.js
 */

var
    fileServer,
    analyser,
    graph,

    path = 'result.html',

    exec        = require('child_process').exec,
    fs          = require('fs'),
    pastry      = require('pastry'),
    staticSever = require('node-static'),

    utils = require('./utils.js'),

    argv = require('optimist')
        .alias('a', 'analyser')
        .alias('b', 'browser')
        .alias('d', 'directory')
        .alias('h', 'host')
        .alias('i', 'ignore')
        .alias('m', 'mainModule')
        .alias('p', 'port')
        .alias('rc', 'requireConfig')
        .alias('s', 'seperator')
        .default('a', 'js-amd')
        .default('b', '/Applications/Google Chrome.app')
        .default('d', './')
        .default('h', 'http://127.0.0.1')
        .default('i', '/node_modules/')
        .default('m', 'index')
        .default('p', 3000)
        .default('rc', null)
        .default('s', null)
        .argv;

function errorTracing (err) {
    if (err) {
        pastry.ERROR(err);
    }
}

analyser = require(pastry.sprintf('./analyser/%s.js', argv.analyser));
graph    = analyser.analyse(argv);

if (!graph.circles) {
    utils.findCircles(graph);
}

// 写入 graph 数据 {
    fs.writeFile('./json/resultTree.json', pastry.JSON.stringify(graph, null, '\t'), 'utf-8', errorTracing);
// }
// 启动文件服务器 {
    fileServer = new staticSever.Server('./');

    require('http').createServer(function (request, response) {
        request.addListener('end', function () {
            fileServer.serve(request, response);
        }).resume();
    }).listen(argv.port);
// }
// 打开浏览器 {
    exec(pastry.sprintf('open -a "%s" \'%s:%d/%s\'', argv.browser, argv.host, argv.port, path), errorTracing);
// }

