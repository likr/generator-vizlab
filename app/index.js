'use strict';
var yeoman = require('yeoman-generator');


var VizlabGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    var prompts = [
      {
        type: 'input',
        name: 'appName',
        message: 'App name',
        default: this.appname.replace(/\s+/g, '-')
      },
      {
        type: 'input',
        name: 'appTitle',
        message: 'App title',
        default: this.appname
      },
      {
        type: 'list',
        name: 'lang',
        message: 'Scripting language',
        choices: [
          'JavaScript',
          'CoffeeScript',
          'TypeScript',
          'TraceurCompiler'
        ],
        default: 'TraceurCompiler'
      },
      {
        type: 'checkbox',
        name: 'libs',
        message: 'Libraries',
        choices: [
          'D3.js',
          'Three.js'
        ],
        default: [
          'D3.js',
          'Three.js'
        ]
      }
    ];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;
      this.appTitle = props.appTitle;
      this.lang = props.lang;
      this.libs = props.libs;

      done();
    }.bind(this));
  },

  writing: function () {
    this.mkdir('app');
    this.mkdir('app/partials');
    this.mkdir('app/scripts');
    this.mkdir('app/styles');
    this.mkdir('src');

    this.template('_gitignore', '.gitignore');
    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    this.template('jshintrc', 'src/.jshintrc');
    this.template('Gruntfile.js', 'Gruntfile.js');
    this.template('app/index.html', 'app/index.html');
    this.template('app/partials/main.html', 'app/partials/main.html');
    this.template('app/styles/app.css', 'app/styles/' + this.appName + '.css');

    if (this.lang === 'CoffeeScript') {
      this.template('coffee/app.coffee', 'src/' + this.appName + '.coffee');
      this.template('coffee/controllers/main.coffee', 'src/controllers/main.coffee');
    } else if (this.lang === 'TypeScript') {
    } else if (this.lang === 'TraceurCompiler') {
      this.template('traceur/app.js', 'src/' + this.appName + '.js');
      this.template('traceur/controllers/main.js', 'src/controllers/main.js');
    } else {
    }
  },

  end: function () {
    this.installDependencies({
      callback: function () {
        this.spawnCommand('grunt', ['bower', 'build']);
      }.bind(this)
    });
  }
});

module.exports = VizlabGenerator;
