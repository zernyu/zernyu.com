module.exports = function (grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            release: ['release/**/*']
        },
        cssmin: {
            options: {
                banner: '/* Generated <%= grunt.template.today("yyyy-mm-dd") %> */',
                keepSpecialComments: 0,
                report: 'min'
            },
            minify: {
                src: ['css/*.css', '!css/ie*.css'],
                dest: 'release/css/main.css'
            }
        },
        htmlmin: {
            options: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true
            },
            index: {
                src: 'index.html',
                dest: 'release/index.html'
            }
        },
        imagemin: {
            site: {
                files: [
                    {
                        expand: true,
                        cwd: 'png/',
                        /* Blurred images look bad optimized */
                        src: ['**/*{1,3}.png'],
                        dest: 'release/png/'
                    }
                ]
            },
            projects: {
                files: [
                    {
                        expand: true,
                        cwd: 'pages/',
                        src: ['**/*.png'],
                        dest: 'release/pages/'
                    }
                ]
            }
        },
        jshint: {
            options: {
                bitwise: true,
                camelcase: true,
                curly: true,
                eqeqeq: true,
                forin: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                nonew: true,
                quotmark: 'single',
                undef: true,
                unused: true,
                strict: true,
                trailing: true,
                indent: 4,
                browser: true,
                jquery: true,
                globals: {
                    require: false,
                    define: false,
                    Router: false,
                    History: false
                }
            },
            all: ['js/app.js', 'js/zernyu/**/*.js']
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: 'js/lib',
                    name: '../config',
                    out: 'release/js/main.js',

                    paths: {
                        'app': '../app',
                        'config': '../config',
                        'zernyu': '../zernyu',
                        'jquery': 'jquery/jquery-1.10.2',
                        'jquery-ui': 'jquery/jquery-ui-1.10.1.custom.min',
                        'jquery-history': 'jquery/jquery-history.min',
                        'jquery-slides': 'jquery/jquery.slides.min',
                        'jquery-mousewheel': 'jquery/jquery.mousewheel',
                        'Router': 'Router',
                        'modernizr': 'modernizr-2.6.2.custom.min',
                        requireLib: 'requirejs/requirejs.min'
                    },

                    include: ['requireLib'],
                    optimize: 'uglify2',
//                    generateSourceMaps: true,
                    preserveLicenseComments: false,
                    done: function (done, output) {
                        var duplicates = require('rjs-build-analysis').duplicates(output);

                        if (duplicates.length > 0) {
                            grunt.log.subhead('Duplicates found in requirejs build:');
                            grunt.log.warn(duplicates);
                            done(new Error('r.js built duplicate modules, please check the excludes option.'));
                        }

                        done();
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.registerTask('default', ['clean']);
    grunt.registerTask('build', ['clean', 'jshint', 'cssmin', 'htmlmin', 'requirejs']);
};