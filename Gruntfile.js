
module.exports = function () {
    "use strict";

    var
        pastry  = require('pastry'),
        grunt   = require('grunt'),
        pkg     = grunt.file.readJSON('package.json');

    grunt.initConfig({
        pkg: pkg,

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            files: {
                gruntfile: [
                    'Gruntfile.js'
                ],
                bin: [
                    'bin/js/*.js'
                ],
                json: [
                    'doc/json/*.json',
                    'package.json'
                ],
                src: [
                    'src/**/*.js'
                ],
                spec: [
                    'spec/*.js'
                ]
            }
        },

        less: {
            development: {
                files: {
                    'css/style.css': 'less/style.less',
                }
            }
        },

        watch: {
            less: {
                files: [
                    'less/*.less',
                ],
                tasks: [
                    'less'
                ]
            }
        }
    });

    pastry.each([
        'less',
        'jshint',
        'watch'
    ], function (task) {
        grunt.loadNpmTasks('grunt-contrib-' + task);
    });

    grunt.registerTask('default', [
        'jshint'
    ]);
};
