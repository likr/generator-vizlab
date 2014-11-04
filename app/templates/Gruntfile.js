'use strict';

var path = require('path');

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower: {
      install: {
        options: {
          targetDir: 'app',
          layout: function(type) {
            var renamedType = type;
            if (type === 'js' || type === 'map') {
              renamedType = 'scripts';
            } else if (type === 'css') {
              renamedType = 'styles';
            }
            return path.join(renamedType, 'lib');
          }
        }
      }
    },
    browserify: {
      dist: {
        files: {
          'app/scripts/<%= appname %>.js': ['js/<%= appname %>.js']
        }
      }
    },
    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        commit: false,
        createTag: false,
        push: false
      }
    },<% if (lang === 'CoffeeScript') { %>
    coffee: {
      compile: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['**/*.coffee'],
            dest: 'build',
            ext: '.js'
          }
        ]
      }
    },<% } %>
    concat: {
      dist: {
        src: [
          'build/<%= appName %>.js',
          'build/services/*.js',
          'build/directives/*.js',
          'build/controllers/*.js'
        ],
        dest: 'app/scripts/<%= appName %>.js'
      }
    },<% if (lang === 'TraceurCompiler') { %>
    traceur: {
      options: {
        modules: 'inline'
      },
      src: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['**/*.js'],
            dest: 'build'
          }
        ]
      }
    },<% } %>
    watch: {<% if (lang === 'CoffeeScript') { %>
      src: {
        files: ['src/**/*.coffee'],
        tasks: ['build']
      }<% } else if (lang === 'TraceurCompiler') { %>
      src: {
        files: ['src/**/*.js'],
        tasks: ['build']
      }<% } %>
    }
  });

  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-browserify');<% if (lang === 'CoffeeScript') { %>
  grunt.loadNpmTasks('grunt-contrib-coffee');<% } %>
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');<% if (lang === 'TraceurCompiler') { %>
  grunt.loadNpmTasks('grunt-traceur');<% } %>
<% if (lang === 'coffee') { %>
  grunt.registerTask('build', ['coffee', 'concat']);<% } else if (lang === 'TraceurCompiler') { %>
  grunt.registerTask('build', ['traceur', 'concat']);<% } %>
  grunt.registerTask('default', ['build']);
};
