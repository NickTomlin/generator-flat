'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var FlatGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = yeoman.file.readJSON(path.join(__dirname, '../package.json'));

    // @todo: can we just supply a default via this.argument?
    this.defaultProjName = "Flat."
    this.argument('projName', {
      type: String,
      required: false,
      optional: true,
      desc: 'name for your project',
      banner: 'Used in bower.json, package.json and friends'
    });

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.npmInstall();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    console.log(chalk.magenta('_____________________________'));
    console.log(chalk.magenta('Flat: simple html boilerplate'));
    console.log(chalk.magenta('-----------------------------'));

    // answering prompts is boring.
    done();
  },

  app: function () {
    // @todo can we shortcut with mkdirp here?
    this.mkdir('public');
    this.mkdir('public/js');
    this.mkdir('public/css');
    // @todo: bundle in testing
    // this.mkdir('test');
    // this.mkdir('test/unit');

    this.copy('_app.js', 'public/js/app.js');
    this.copy('_app.styl', 'public/css/app.styl');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');

    // infrastructure
    this.template('_package.json', 'package.json');
    this.copy('_index.html', 'app/index.html');
    this.copy('_bower.json', 'bower.json');
    this.copy('_Gruntfile.js', 'Gruntfile.js');
  }
});

module.exports = FlatGenerator;
