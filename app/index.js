'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var FlatGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = yeoman.file.readJSON(path.join(__dirname, '../package.json'));

    this.options.backbone = this.options.browserify = true;
    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.npmInstall();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    console.log(this.yeoman);

    console.log(chalk.magenta('_____________________________'));
    console.log(chalk.magenta('Flat: simple html boilerplate'));
    console.log(chalk.magenta('_____________________________'));

    // answering prompts is boring.
    done();

// @todo @nick bring these back in with more helpful options?
//     var prompts = [
//       {
//         type: 'confirm',
//         name: 'backbone',
//         message: 'Install backbone and dependencies?',
//         default: true
//       },
//       {
//         type: 'confirm',
//         name: 'browserify',
//         message: 'Use browserify to handle dependencies?',
//         default: true
//       }
//     ];
//
//     this.prompt(prompts, function (props) {
//       this.options.backbone = true;
//       this.options.browserify = true;
//
//       done();
//     }.bind(this));
  },

  app: function () {
    this.mkdir('public');
    this.mkdir('public/js');
    this.mkdir('public/css');

    this.copy('_package.json', 'package.json');
    this.copy('_index.html', 'app/index.html');
    this.copy('_bower.json', 'bower.json');
    this.copy('_appjs', 'public/js/app.js');
    this.copy('_app.styl', 'public/css/app.styl');
    this.copy('_Gruntfile.js', 'Gruntfile.js');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = FlatGenerator;
