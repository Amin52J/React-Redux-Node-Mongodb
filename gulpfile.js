var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var browserify = require('browserify');
var watchify = require('watchify');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

var production = false;
/*var production = true;*/

process.stdout.write(production + "\n");

var dependencies = [
  'react',
  'react-dom',
  'react-router',
  'redux',
  'react-redux'
];

/*
 |--------------------------------------------------------------------------
 | Combine all JS libraries into a single file for fewer HTTP requests.
 |--------------------------------------------------------------------------
 */
gulp.task('vendor', function () {
  return gulp.src([]).pipe(concat('vendor.js'))
    .pipe(gulpif(production, uglify({mangle: false})))
    .pipe(gulp.dest('public/js'));
});

/*
 |--------------------------------------------------------------------------
 | Compile third-party dependencies separately for faster performance.
 |--------------------------------------------------------------------------
 */
gulp.task('browserify-vendor', function () {
  return browserify()
    .require(dependencies)
    .bundle()
    .pipe(source('vendor.bundle.js'))
    .pipe(buffer())
    .pipe(gulpif(production, uglify({mangle: false})))
    .pipe(gulp.dest('public/js'));
});

/*
 |--------------------------------------------------------------------------
 | Compile only project files, excluding all third-party dependencies.
 |--------------------------------------------------------------------------
 */
gulp.task('browserify', ['browserify-vendor'], function () {
  return browserify({entries: 'app/main.js', debug: true})
    .require(dependencies)
    .transform(babelify, {presets: ['es2015', 'react']})
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulpif(production, sourcemaps.init({loadMaps: true})))
    .pipe(gulpif(production, uglify({mangle: false})))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/js'));
});

/*
 |--------------------------------------------------------------------------
 | Same as browserify task, but will also watch for changes and re-compile.
 |--------------------------------------------------------------------------
 */
gulp.task('browserify-watch', ['browserify-vendor'], function () {
  var bundler = watchify(browserify({entries: 'app/main.js', debug: true}, watchify.args));
  bundler.require(dependencies);
  bundler.transform(babelify, {presets: ['es2015', 'react']});
  bundler.on('update', rebundle);
  return rebundle();

  function rebundle() {
    var start = Date.now();
    return bundler.bundle()
      .on('error', function (err) {
        gutil.log(gutil.colors.red(err.toString()));
      })
      .on('end', function () {
        gutil.log(gutil.colors.green('Finished rebundling in', (Date.now() - start) + 'ms.'));
      })
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(gulpif(production, sourcemaps.init({loadMaps: true})))
      .pipe(gulpif(production, sourcemaps.write('.')))
      .pipe(gulp.dest('public/js/'));
  }
});

/*
 |--------------------------------------------------------------------------
 | Compile SCSS stylesheets.
 |--------------------------------------------------------------------------
 */
gulp.task('styles', function () {
  return gulp.src('app/stylesheets/main.scss')
    .pipe(plumber())
    .pipe(sass({includePaths: ['./node_modules/react-md/src/scss/']}).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulpif(production, cssmin()))
    .pipe(gulp.dest('public/css'));
});

gulp.task('watch', function () {
  gulp.watch('app/stylesheets/**/*.scss', ['styles']);
});

gulp.task('default', ['styles', 'vendor', 'browserify-watch', 'watch']);
gulp.task('build', ['styles', 'vendor', 'browserify']);