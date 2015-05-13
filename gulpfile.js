var gulp = require('gulp');
var less = require('gulp-less');
var prefix = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var plumb = require('gulp-plumber');

gulp.task('styles', function(){
	return gulp.src('assets/css/less/style.less')
		.pipe(plumb())
			.pipe(less())
			.pipe(prefix({
				browsers: ['> 5%'],
				cascade: true
			}))	
		.pipe(plumb.stop())
		.pipe(gulp.dest('assets/css'));		
});

gulp.task('watch', function(){
	gulp.watch('assets/css/less/*.less', ['styles']);
});

gulp.task('default', ['styles', 'watch']);