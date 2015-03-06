// var gulp   = require('gulp')
// 	        minifyCSS = require('gulp-minify-css');
// var concat = require('gulp-concat')
// var stylus = require('gulp-stylus')

// gulp.task('css', function () {
//   return gulp.src(['bower_components/bootstrap-stylus/stylus/bootstrap.styl', 'css/app.styl'])
//     .pipe(stylus())
//     .pipe(concat('app.css'))
//     .pipe(minifyCSS({keepBreaks:false}))
//     .pipe(gulp.dest('assets'))
// })

// gulp.task('watch:css', ['css'], function () {
//   gulp.watch('css/**/*.styl', ['css'])
// })
var gulp = require('gulp')
var less = require('gulp-less')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var minifyCSS = require('gulp-minify-css')
var sourcemaps = require('gulp-sourcemaps')

gulp.task('css', function () {
	return gulp.src([
		'node_modules/bootstrap/less/bootstrap.less',
		])
	.pipe(sourcemaps.init())
	.pipe(less())
	.pipe(concat('app.css'))
	.pipe(minifyCSS())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('assets'))
})

gulp.task('watch:css', ['css'], function () {
	gulp.watch('less/*.less', ['css'])
})