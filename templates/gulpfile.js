'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var stylus = require('gulp-stylus');
var nib = require('nib');
var less = require('gulp-less');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var postcss      = require('gulp-postcss');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var ghPages = require('gulp-gh-pages');
const browserSync = require('browser-sync').create();

gulp.task('compile', function() {
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('app/compiled_js/*.js', uglify()))
    .pipe(gulpIf('*.css', sourcemaps.init()))
    .pipe(gulpIf('*.css', postcss([ autoprefixer() ])))
    .pipe(gulpIf('*.css', sourcemaps.write('.')))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
    .pipe(stylus())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('stylus', function() {
  return gulp.src('app/stylus/**/*.styl')
    .pipe(stylus({ use: nib(), 'include css': true }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('less', function() {
  return gulp.src('app/less/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('images', function() {
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});

gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
})

gulp.task('es6', function() {
  return gulp.src('app/js/*.js')
    .pipe(babel())
    .pipe(gulp.dest('app/compiled_js'));
});

gulp.task('cname', function() {
  gulp.src(['CNAME'])
    .pipe(gulp.dest('./dist/'));
  console.log('Running the gulpfile and the copy CNAME task');
})

gulp.task('clean:dist', function() {
  return del.sync('dist');
})

gulp.task('cache:clear', function(callback) {
return cache.clearAll(callback)
})


gulp.task('watch', ['browserSync', 'sass', 'stylus', 'less', 'es6'], function() {
  gulp.watch('app/stylus/**/*.styl', ['stylus']);
  gulp.watch('app/less/**/*.less', ['less']);
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', ['es6']);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('build', function(callback) {
  runSequence('clean:dist',
    ['compile', 'images', 'fonts', 'es6', 'cname'],
    callback
  )
});

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});
