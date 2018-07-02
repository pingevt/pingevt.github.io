var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');


var paths = {
  styles: [
    './assets/scss/styles.scss',
  ]
}

// Theme CSS
gulp.task('css-theme', function () {
  gulp.src(paths.styles)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({ browsers: ['last 3 versions'] }))
    .pipe(sourcemaps.write('./assets/css/maps'))
    .pipe(gulp.dest('./assets/css'))
    .pipe(cleanCSS({}))
    .pipe(rename(function (path) {
      path.basename += ".min";
    }))
    .pipe(gulp.dest('./assets/css'))
    .pipe(notify({ message: 'SCSS Compiled <%= file.relative %>!!' }));
});

// Theme JS
gulp.task('js-theme', function () {
  gulp.src('./assets/js/*.js')
    .pipe(plumber())
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest('./assets/dist/js'))
    .pipe(notify({ message: 'Compiled <%= file.relative %>!' }));
});






gulp.task('watch', function () {
  // Theme Specific
  gulp.watch('./assets/scss/**/*.scss', ['css-theme']);
  // gulp.watch(theme_base + '/src/js/*.js', ['js-theme']);

  // Any Custom Module Specific
});

gulp.task('default', ['watch']);

// And for one command
gulp.task('compile', ['css-theme', 'js-theme']);