var gulp = require('gulp')
var fs = require('fs')
fs.readdirSync(__dirname + '/gulp').forEach(function (task) {
	require('./gulp/' + task)
})

var filesToMove = './node_modules/font-awesome/fonts/*'

gulp.task('move', function(){
  gulp.src(filesToMove)
  .pipe(gulp.dest('assets/fonts'));
})

gulp.task('build', ['js', 'css', 'move'])
gulp.task('watch', ['watch:js', 'watch:css'])
gulp.task('dev', ['watch', 'dev:server'])
gulp.task('dev', ['watch:css', 'watch:js', 'dev:server', 'move'])
