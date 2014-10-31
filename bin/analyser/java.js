#!/usr/bin/env node
var xmlreader = require("xmlreader");
var fs = require("fs");

var nodes = [];
var edges = [];
var deps = {};        
var edgeKeys = {};
function addNode(name) {
    if (!deps[name]) {
        deps[name] = 1;
        nodes.push({id: name, name: name})
        autoAddParents(name);
    } else {
        deps[name] += 1;
    }
}

function addEdge(source, target) {
    if (source == target) {
        return;
    }
    
    var edgeKey = "S" + source + "T" + target;
    if (!edgeKeys[edgeKey]) {
        edgeKeys[edgeKey] = 1;
        edges.push({id: edgeKey, source: source, target: target});
    } else {
        edgeKeys[edgeKey] += 1;
    }
}

function autoAddParents(name) {
    var idx = name.lastIndexOf(".");
    var currentChildName = name;
    var currentParentName = currentChildName.substring(0, idx);
    while (currentParentName && currentParentName.indexOf(".") > 0) {
        console.log("currentParentName: " + currentParentName + ", currentChildName: " + currentChildName);
        addNode(currentParentName);
        addNode(currentChildName);
        //addEdge(currentChildName, currentParentName);
        addEdge(currentParentName, currentChildName);

        currentChildName = currentParentName;
        idx = currentChildName.lastIndexOf(".");
        currentParentName = currentChildName.substring(0, idx);
    }
}

function cleanupXml(content) {
    // nodejs xmlreader module has a bug that you cann't have a node named parent in xml
    var idx1 = content.indexOf("<parent>");
    var idx2 = content.indexOf("</parent>");
    if (idx1 >= 0) {
        content = content.substring(0, idx1) + content.substring(idx2 + 9);
    }

    return content;
}

function parsePom(pomFilePath, projectName) {
    var pom = fs.readFileSync(pomFilePath, {encoding: 'utf8'});
    // cleanup pom xml
    pom = cleanupXml(pom);
    
    var name = "";
    xmlreader.read(pom, function(err, data) {
        if (err) {
            console.log("error: " + err);
            return;
        }
        name = data.project.artifactId.text();
        //var dependencies = data.project.dependencyManagement.dependencies.dependency.array;
        // ignore the parent-pom
        if (data.project.dependencyManagement) {
            return;
        }

        // ignore the project which has no deps
        if (!data.project.dependencies) {
            return;       
        }
        
        var dependencies = data.project.dependencies.dependency.array;
        if (!dependencies) {
            dependencies = data.project.dependencies;
        }
        
        addNode(name);
        addEdge(projectName, name);
        //addEdge(name, projectName);
        
        for (var i in dependencies) {
            var dependency = dependencies[i];
            if (dependency.dependency) {
                dependency = dependency.dependency;
            }
            var groupId = dependency.groupId;
            if (!groupId) {
                break;
            } else {
                groupId = groupId.text();
            }
            var artifactId = dependency.artifactId.text();

            addNode(groupId);
            addNode(artifactId);
            //addEdge(name, groupId);
            addEdge(name, artifactId);
            //addEdge(groupId, name);
            addEdge(groupId, artifactId);
        }
    });
}

function findAllPomFiles(basePath) {
    var ret = [];
    findAllPomFilesHelper(basePath, ret);
    return ret;
}

function findAllPomFilesHelper(basePath, ret) {
    var currentPath = basePath;
    var files = fs.readdirSync(currentPath);
    for (var i in files) {
        var file = files[i];
        var filePath = basePath + "/" + file;
        if (fs.statSync(filePath).isDirectory(filePath)) {
            findAllPomFilesHelper(filePath, ret);
        } else if (file == 'pom.xml') {
            ret.push(filePath);
        }
    }
}

/**
 * 分析 Project
 */
function analyseProject(basePath) {
    var projectName = basePath;
    var idx = basePath.lastIndexOf("/");
    if (idx >= 0) {
        projectName = basePath.substring(idx + 1);
    }
    projectName = "com.alipay." + projectName;
    var allPomFilePaths = findAllPomFiles(basePath);

    addNode(projectName);
    for (var i in allPomFilePaths) {
        var pomFilePath = allPomFilePaths[i];
        parsePom(pomFilePath, projectName);
    }
}

var analyse = function(option) {
    // 输入的路径可以是逗号分隔的多个路径
    var basePaths = option.directory.split(",");
    for (var i in basePaths) {
        var basePath = basePaths[i];
        analyseProject(basePath);
    }

    var ret = {
        nodes: nodes,
        edges: edges,
        circles: []
    };

    return ret;
}

module.exports = {
    analyse: analyse
};
