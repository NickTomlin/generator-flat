/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('flat generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('flat:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      'bower.json',
      'package.json',
      'Gruntfile.js',
      '.jshintrc',
      '.editorconfig'
    ];

    helpers.mockPrompt(this.app, {
      'someOption': true
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });

  // @todo: broken fix
  it('Inserts appName argument into files', function (done) {
    var APP_NAME = "My Flat Generated App";
    var APP_REGEX = new RegExp(APP_NAME);
    var expected = [
      'package.json',
      'bower.json',
      'README.md'
    ].map(function(filename){ return [filename, APP_REGEX ] });

    console.log(expected);

    helpers.mockPrompt(this.app, {
      'appName': APP_NAME
    });

    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFileContent(expected);
      done();
    });
  });
});
