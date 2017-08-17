var config = require('../config');

var path = require('path');
var gulp = require('gulp');
var jasmineBrowser = require('gulp-jasmine-browser');

var testDir = [
  path.join(config.dirs.src.tests, '/**/*Spec.js'),
  path.join(config.dirs.src.tests, '/**/*spec.js'),
];

function testJS() {
  return gulp.src(testDir)
    .pipe(jasmineBrowser.specRunner({console: true}))
    .pipe(jasmineBrowser.headless());
}

gulp.task('test-headless-jasmine:js', testJS);
module.exports = testJS;
