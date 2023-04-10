
'use strict'
var gulp = require('gulp')
var sass = require('gulp-sass')(require('sass'))

var sassPaths = [
  'bower_components/normalize.scss/sass',
  'bower_components/foundation/scss',
  'bower_components/motion-ui/src'
]

function buildStyles () {
  return gulp.src('scss/style.scss')
    .pipe(sass(
      {
        includePaths: sassPaths,
        outputStyle: 'compressed' // if css compressed **file size**
      }).on('error', sass.logError))
    .pipe(gulp.dest('css'))
};

exports.default = buildStyles
