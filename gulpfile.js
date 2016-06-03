var gulp    = require('gulp'),
    sass    = require('gulp-sass'),
    concat  = require('gulp-concat'),
    bowerFiles   = require('main-bower-files'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify  = require('gulp-uglify'),
    jshint  = require('gulp-jshint'),
    rename  = require('gulp-rename'),
    notify  = require('gulp-notify'),
    minifyCSS   = require('gulp-minify-css'),
    browserSync = require('browser-sync');

var paths = {
        in : {
            public     : 'public/',
            scripts    : 'resources/js/',
            sass       : 'resources/sass/'
        },
        out : {
            fonts      : 'public/fonts',
            public     : 'public',
            scripts    : 'public/js',
            styles     : 'public/css'
        }
    };

var files = {
        css    : '*.css',
        js     : '*.js',
        html   : '*.html',
        sass   : '*/*.scss',
        script : 'script.js',
        style  : 'style.scss'
    };

gulp.task('styles', function() {
    return gulp.src( paths.in.sass + files.style )
            .pipe( sass({ errLogToConsole: true }) )
            .pipe( autoprefixer('last 5 version') )
            .pipe( rename({ suffix: '.min' }) )
            .pipe( minifyCSS() )
            .pipe( gulp.dest(paths.out.styles) )
            .pipe( notify( function(file) {
                return 'SASS Compiler file: '+ file.relative;
            }) );
});

gulp.task('scripts', function() {
    return gulp.src( paths.in.scripts + files.script )
        .pipe( jshint('.jshintrc') )
        .pipe( jshint.reporter('default') )
        .pipe( rename({ suffix: '.min' }) )
        .pipe( uglify() )
        .pipe( gulp.dest(paths.out.scripts) )
        .pipe( notify( function(file) {
            return 'Scripts Compiler file: '+ file.relative;
        }) );
});

gulp.task('bower_styles', function() {
    return gulp.src( bowerFiles('**/' + files.css) )
            .pipe( concat('components.min.css') )
            .pipe( minifyCSS() )
            .pipe( gulp.dest(paths.out.styles) )
            .pipe( notify( function(file) {
                return 'Bower CSS Compiler file: '+ file.relative;
            }) );
});

gulp.task('bower_scripts', function() {
    return gulp.src( bowerFiles('**/' + files.js) )
            .pipe( concat('components.min.js') )
            .pipe( uglify() )
            .pipe( gulp.dest(paths.out.scripts) )
            .pipe( notify( function(file) {
                return 'Bower Compiler file: '+ file.relative;
            }) );
});

gulp.task('browser_sync', function() {
    browserSync.init(null, {
        server: { baseDir: paths.out.public }
    });
});

gulp.task('bs_reload', function() {
    browserSync.reload();
});

gulp.task('watch', function() {
    gulp.watch( paths.in.sass + files.sass, ['styles'] );
    gulp.watch( paths.in.scripts + files.js, ['scripts'] );
    gulp.watch( paths.in.app + files.html, ['bs_reload'] );
});

gulp.task('default', [ 'styles', 'scripts', 'bower_styles', 'bower_scripts', 'browser_sync', 'watch' ]);
