var config = require('../config');

var path = require('path');
var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var reporters = require('jasmine-reporters');

var testDir = [
  path.join(config.dirs.src.tests, '/**/*Spec.js'),
  path.join(config.dirs.src.tests, '/**/*spec.js'),
];

function testJasmineJS() {
  gulp.src(testDir)
    .pipe(jasmine({
      reporter: new reporters.TerminalReporter({
        verbosity: 3,
        color: true,
        showStack: true
      })
    }));
}

gulp.task('test-jasmine:js', testJasmineJS);
module.exports = testJasmineJS;
