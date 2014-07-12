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
            if (type === 'js') {
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
    coffee: {
      compile: {
        files: [
          {
            expand: true,
            cwd: 'coffee/',
            src: ['**/*.coffee'],
            dest: 'js',
            ext: '.js'
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-coffee');

  grunt.registerTask('compile', ['coffee', 'browserify']);
};
