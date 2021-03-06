var gulp = require('gulp'),
    csso = require('gulp-csso'),
	myth = require('gulp-myth'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    del = require('del'),
    notify = require('gulp-notify'),
    watch = require('gulp-watch'),
    rename = require('gulp-rename'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync'),
    ssi = require('ssi');

var env = {
    src: 'src',
    build: 'export'
};

gulp.task('connect', function() {

    browserSync({
        notify: false,
        port: 4000,
        startPath: '/docs',
        server: {
            baseDir: env.build
        },
        ghostMode: {
            clicks: true,
            forms: true,
            scroll: true
        }
    });

});

gulp.task('styles', function() {

    return gulp.src([env.src + '/static/stylesheets/*.css'])
        .pipe(myth())
        .pipe(csso())
        .pipe(gulp.dest(env.build + '/static/stylesheets/'))
        .pipe(notify({ message: 'Styles task complete' }));

});

gulp.task('hint', function() {

    return gulp.src([env.src + '/static/javascripts/**/*.js', '!' + env.src + '/static/javascripts/utils/**/*.js','!' + env.src + '/static/javascripts/shim/**/*.js'])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'));

});

gulp.task('scripts', ['scripts-vendor', 'scripts-shims'], function() {

    return gulp.src([env.src + '/static/javascripts/shim/DOMContentLoaded.js', env.src + '/static/javascripts/shim/Array.js', env.src + '/static/javascripts/shim/Object.js', env.src + '/static/javascripts/shim/ClassList.js', env.src + '/static/javascripts/shim/MatchMedia.js', env.src + '/static/javascripts/shim/AddEventListener.js', env.src + '/static/javascripts/shim/Bind.js', env.src + '/static/javascripts/shim/String.js', env.src + '/static/javascripts/utils/*.js', env.src + '/static/javascripts/app/core/**/*.js', env.src + '/static/javascripts/app/helpers/**/*.js', env.src + '/static/javascripts/app/ui/**/*.js'])
		.pipe(concat('main.debug.js'))
		.pipe(gulp.dest(env.build + '/static/javascripts/'))
        .pipe(uglify())
        .pipe(rename('main.js'))
        .pipe(gulp.dest(env.build + '/static/javascripts/'));

});

gulp.task('scripts-vendor', function() {

    return gulp.src([env.src + '/static/javascripts/vendor/**/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest(env.build + '/static/javascripts/vendor/'));

});

gulp.task('scripts-shims', function() {

    return gulp.src([env.src + '/static/javascripts/shim/html5shiv-printshiv.js'])
        .pipe(uglify())
        .pipe(gulp.dest(env.build + '/static/javascripts/shim/'));

});

gulp.task('images', ['static-images'], function() {

    return gulp.src(env.src + '/media/images/**/*')
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest(env.build + '/media/images/'));

});

gulp.task('static-images', function() {

    return gulp.src(env.src + '/static/images/**/*')
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest(env.build + '/static/images/'));

});

gulp.task('fonts', function() {

    return gulp.src(env.src + '/static/fonts/*')
        .pipe(gulp.dest(env.build + '/static/fonts/'));

});

gulp.task('clean', function() {
    del.bind(null, [env.build]);
});

gulp.task('templates', function() {

    var pages = new ssi(env.src + '/pages', env.build + '/pages', '/**/**/*.html');
    pages.compile();

    var docs = new ssi(env.src + '/docs', env.build + '/docs', '/**/**/*.html');
    docs.compile();

});

gulp.task('watch', function() {

    gulp.watch(env.src + '/**/**/*.html', function() {
        gulp.start('templates');
    });

    gulp.watch([env.src + '/static/javascripts/**/**/*.js','!' + env.src + '/static/javascripts/shim/**/*.js'], function() {
        gulp.start('hint', 'scripts');
    });

    gulp.watch([env.src + '/static/images/**/*',env.src + '/media/images/**/*'], function() {
        gulp.start('images');
    });

    gulp.watch([env.src + '/static/fonts/**/*'], function() {
        gulp.start('fonts');
    });

});


gulp.task('serve', function() {

    runSequence('clean','templates','styles', 'fonts', 'scripts', 'images', 'watch', 'connect');

});

gulp.task('dist', function() {

    runSequence('clean','images','templates','styles', 'fonts', 'scripts');

});