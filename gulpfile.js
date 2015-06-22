var gulp = require('gulp');

var bundle = require('gulp-bundle-assets'),
    del = require('del'),
    vinylPaths = require('vinyl-paths'),
    fs = require('fs'),
    replace = require('gulp-replace'),
    connect = require('gulp-connect'),
    templateCache = require('gulp-angular-templatecache'),
    jshint = require('gulp-jshint'),
    karma = require('karma').server,
    csslint = require('gulp-csslint');

gulp.task('clean', function () {
    return gulp.src(['public', 'tmp'])
        .pipe(vinylPaths(del));
});


gulp.task('compile', ['clean', 'bundle'], function () {
    var manifest = JSON.parse(fs.readFileSync('./tmp/manifest.json', 'utf8'));

    return gulp.src(['src/app/index.html'])
        .pipe(replace('<!-- vendor-js-injectionpoint -->', manifest.vendor.scripts))
        .pipe(replace('<!-- vendor-css-injectionpoint -->', manifest.vendor.styles))
        .pipe(replace('<!-- templates-js-injectionpoint -->', '<script src=\'templates.js\'></script>'))
        .pipe(replace('<!-- main-js-injectionpoint -->', manifest.main.scripts))
        .pipe(replace('<!-- main-css-injectionpoint -->', manifest.main.styles))
        .pipe(gulp.dest('public'))
        .pipe(connect.reload());
});

gulp.task('bundle', ['clean', 'templates'], function() {
    return gulp.src('./bundle.config.js')
        .pipe(bundle({
            quietMode: true
        }))
        .pipe(bundle.results({
            dest: './tmp',
            fileName: 'manifest'
        }))
        .pipe(gulp.dest('./public'));
});

gulp.task('templates', ['clean'], function() {
    return gulp.src('src/app/**/*.html')
        .pipe(templateCache(
            'templates.js',
            {
                module: 'xr.templates',
                root: '',
                standalone: true
            }
        ))
        .pipe(gulp.dest('public'));
});

gulp.task('webserver', ['compile'], function () {
    connect.server({
        root: 'public',
        livereload: true
    });

});

gulp.task('build', ['clean', 'bundle', 'compile']);

gulp.task('datWatch', function() {
    gulp.watch(['./src/app/**/*.*'], ['jshint', 'csslint', 'compile']);
});

gulp.task('default', ['build', 'jshint', 'csslint', 'datWatch', 'webserver']);

gulp.task('jshint', function() {
    return gulp.src('./src/app/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('jshint:watch', ['jshint'], function() {
    gulp.watch(['./src/app/**/*.js'], ['jshint']);
});

gulp.task('check', ['jshint', 'test'], function() {
    gulp.watch(['./src/app/**/*.js'], ['test']);

});

gulp.task('tdd', function (done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js'
    }, done);
});

gulp.task('csslint', function() {
    gulp.src('src/app/**/*.css')
        .pipe(csslint({

        }))
        .pipe(csslint.reporter());
});