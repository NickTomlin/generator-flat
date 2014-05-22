'use strict';

var config = require('./config/development.json');
var gulp = require('gulp');
var browserify = require('gulp-browserify');
var clean = require('gulp-clean');
var nodemon = require('nodemon');
var sass = require('gulp-sass');

var jsFiles = 'public/js/*/**.js';
var cssFiles = 'public/css/*.scss';

// TODO
// 1. Stylus
// 2. Connect

gulp.task('sass', function () {
  gulp.src(cssFiles)
  .pipe(sass())
  .pipe(gulp.dest('./dist'));
});


gulp.task('clean', function () {
  gulp.src(config.dist, {read: false})
    .pipe(clean());
});

gulp.task('browserify', function () {
  gulp.src(config.jsSrc + '/app.js')
    .pipe(browserify({
      insertGlobal: true,
    }))
    .pipe(gulp.dest(config.dist));
});

gulp.task('nodemon', function  () {
  nodemon({
    script: 'server.js',
    ext: 'js html',
    // currently not working :/
    ignore: ['public/**', 'gulpfile.js']
  });
});

gulp.task('watch', function () {
  gulp.watch([jsFiles], ['browserify']);
  gulp.watch([cssFiles], ['sass']);
});

gulp.task('default', ['clean', 'browserify', 'sass', 'nodemon', 'watch']);
