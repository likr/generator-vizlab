'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');


var VizlabGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.appname = this.appname.replace(/\s+/g, '-');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies({
          callback: function () {
            this.spawnCommand('grunt', ['bower', 'compile']);
          }.bind(this)
        });
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous Vizlab generator!'));

    var prompts = [{
      type: 'input',
      name: 'appTitle',
      message: 'App title',
      default: this.appname
    }];

    this.prompt(prompts, function (props) {
      this.appTitle = props.appTitle;

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('app');
    this.mkdir('app/partials');
    this.mkdir('app/scripts');
    this.mkdir('app/styles');
    this.mkdir('coffee');

    this.copy('_gitignore', '.gitignore');
    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
    this.copy('Gruntfile.js', 'Gruntfile.js');
    this.copy('app/index.html', 'app/index.html');
    this.copy('app/partials/main.html', 'app/partials/main.html');
    this.copy('app/styles/app.css', 'app/styles/' + this.appname + '.css');
    this.copy('coffee/app.coffee', 'coffee/' + this.appname + '.coffee');
    this.copy('coffee/controllers/main.coffee', 'coffee/controllers/main.coffee');
  }
});

module.exports = VizlabGenerator;
