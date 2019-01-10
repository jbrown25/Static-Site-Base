const gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');

gulp.task('browser-sync', () => {
  browserSync({
    server: {
       baseDir: "./public/"
    }
  });
});

gulp.task('bs-reload', () => {
  browserSync.reload();
});


gulp.task('styles', () => {
  gulp.src(['src/scss/**/*.scss'])
    .pipe(plumber({
      errorHandler: (error) => {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sass())
    .pipe(autoprefixer('last 10 versions'))
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('scripts', () => {
  return gulp.src('src/js/**/*.js')
    .pipe(plumber({
      errorHandler: (error) => {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest('public/js/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('default', ['browser-sync'], () => {
  gulp.watch("src/scss/**/*.scss", ['styles']);
  gulp.watch("src/js/**/*.js", ['scripts']);
  gulp.watch("*.html", ['bs-reload']);
});