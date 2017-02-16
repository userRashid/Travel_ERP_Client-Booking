var gulp = require('gulp');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
gulp.task('component', function () {
    return gulp.src('./app/component/**/*.js')
        .pipe(concat('component.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('booking', function () {
    return gulp.src('./app/views/booking/**/*.js')
        .pipe(concat('booking.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('leads', function () {
    return gulp.src('./app/views/leads/**/*.js')
        .pipe(concat('leads.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('employee', function () {
    return gulp.src('./app/views/employee/**/*.js')
        .pipe(concat('employee.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('customers', function () {
    return gulp.src('./app/views/customers/**/*.js')
        .pipe(concat('customers.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('login', function () {
    return gulp.src('./app/views/login/**/*.js')
        .pipe(concat('login.js'))
        .pipe(gulp.dest('./dist/'));
});


gulp.task('build', [
    'component'
    , 'booking'
    , 'leads'
    , 'employee'
    , 'customers'
    , 'login'
], function () {

});

gulp.task('watch',['component','login'],function(){
    gulp.watch('./app/component/**/*.js', function() {
      // run styles upon changes
      gulp.run('component');
    });
    
    gulp.watch('./app/views/login/**/*.js', function() {
      // run styles upon changes
      gulp.run('login');
    });
})