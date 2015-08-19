var gulp = require('gulp'),
    rimraf = require('rimraf'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    insert = require('gulp-insert'),
    p = require('./package.json')
    ;

//Folders and annotation
var src = 'src/',
    dest = 'dist/',
    annotation = '/* ' + p.name + ' v' + p.version + ' | Copyright (c) ' + new Date().getFullYear() + ' ' + p.homepage + ' | ' + p.license + ' license */\n';

gulp.task('clean', function(cb) {
    rimraf(dest, cb);
});

gulp.task('scripts', ['clean'], function() {
    return gulp.src(src + '*.js')
        .pipe(jshint())
        .pipe(jshint.reporter())
        .pipe(uglify())
        .pipe(rename('jquery.seslider.min.js'))
        .pipe(insert.prepend(annotation))
        .pipe(gulp.dest(dest));
        ;
});

gulp.task('default', ['scripts'], function() {

});
