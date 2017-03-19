var gulp = require('gulp');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var minify = require('gulp-minify');
gulp.task('component', function () {
    return gulp.src('./app/component/**/*.js')
        .pipe(concat('component.js'))
        //.pipe(minify())
        .pipe(gulp.dest('./app/dist/'));
});

gulp.task('booking', function () {
    return gulp.src('./app/views/booking/**/*.js')
        .pipe(concat('booking.js'))
        //.pipe(minify())
        .pipe(gulp.dest('./app/dist/'));
});

gulp.task('leads', function () {
    return gulp.src('./app/views/leads/**/*.js')
        .pipe(concat('leads.js'))
        //.pipe(minify())
        .pipe(gulp.dest('./app/dist/'));
});

gulp.task('employee', function () {
    return gulp.src('./app/views/employee/**/*.js')
        .pipe(concat('employee.js'))
        //.pipe(minify())
        .pipe(gulp.dest('./app/dist/'));
});

gulp.task('customers', function () {
    return gulp.src('./app/views/customers/**/*.js')
        .pipe(concat('customers.js'))
        //.pipe(minify())
        .pipe(gulp.dest('./app/dist/'));
});

gulp.task('login', function () {
    return gulp.src('./app/views/login/**/*.js')
        .pipe(concat('login.js'))
        .pipe(minify())
        .pipe(gulp.dest('./app/dist/'));
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

gulp.task('watch', ['component', 'login'], function () {
    gulp.watch('./app/component/**/*.js', function () {
        // run styles upon changes
        gulp.run('component');
    });

    gulp.watch('./app/views/login/**/*.js', function () {
        // run styles upon changes
        gulp.run('login');
    });
})