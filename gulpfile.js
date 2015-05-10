var gulp = require('gulp');

var bundle = require('gulp-bundle-assets'),
    del = require('del'),
    vinylPaths = require('vinyl-paths'),
    fs = require('fs'),
    replace = require('gulp-replace'),
    connect = require('gulp-connect'),
    templateCache = require('gulp-angular-templatecache');

gulp.task('clean', function () {
    return gulp.src(['public', 'tmp'])
        .pipe(vinylPaths(del));
});


gulp.task('compile', ['bundle'], function () {
    var manifest = JSON.parse(fs.readFileSync('./tmp/manifest.json', 'utf8'));

    return gulp.src(['src/app/index.html'])
        .pipe(replace('<!-- vendor-js-injectionpoint -->', manifest.vendor.scripts))
        .pipe(replace('<!-- templates-js-injectionpoint -->', '<script src=\'templates.js\'></script>'))
        .pipe(replace('<!-- main-js-injectionpoint -->', manifest.main.scripts))
        .pipe(gulp.dest('public'))
        .pipe(connect.reload());
});


gulp.task('bundle', ['clean', 'templates'], function() {
    return gulp.src('./bundle.config.js')
        .pipe(bundle())
        .pipe(bundle.results({
            dest: './tmp',
            fileName: 'manifest'
        }))
        .pipe(gulp.dest('./public'));
});

gulp.task('templates', function() {
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

gulp.task('default', ['build', 'datWatch', 'webserver']);

gulp.task('datWatch', function() {
    gulp.watch(['./src/app/**/*.*'], ['compile']);
});
