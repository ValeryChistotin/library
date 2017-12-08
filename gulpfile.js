var gulp = require('gulp'),
  sass = require('gulp-sass');

gulp.task('sass', function(){
  gulp.src('sass/*.sass')
    .pipe(sass({ set: ['compress'] }))
    .pipe(gulp.dest('public/css'));
});

gulp.task('watch', function(){
  gulp.watch('sass/*.sass', ['sass']);
});

gulp.task('default', ['sass', 'watch']);