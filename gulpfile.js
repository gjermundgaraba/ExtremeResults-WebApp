var gulp = require('gulp');

var bundle = require('gulp-bundle-assets'),
    del = require('del'),
    vinylPaths = require('vinyl-paths'),
    fs = require('fs'),
    replace = require('gulp-replace'),
    server = require('gulp-webserver');


gulp.task('clean', function () {
    return gulp.src(['public', 'tmp'])
        .pipe(vinylPaths(del));
});


gulp.task('compile', ['bundle'], function () {
    var manifest = JSON.parse(fs.readFileSync('./tmp/manifest.json', 'utf8'));

    return gulp.src(['src/index.html'])
        .pipe(replace('<!-- vendor-js-injectionpoint -->', manifest.vendor.scripts))
        .pipe(replace('<!-- main-js-injectionpoint -->', manifest.main.scripts))
        .pipe(gulp.dest('public'));
});


gulp.task('bundle', ['clean'], function() {
    return gulp.src('./bundle.config.js')
        .pipe(bundle())
        .pipe(bundle.results({
            dest: './tmp',
            fileName: 'manifest'
        }))
        .pipe(gulp.dest('./public'));
});


gulp.task('webserver', ['compile'], function () {
    gulp.src('public')
        .pipe(server({
            defaultFile: 'index.html',
            livereload: true,
            open: true
        }));
});

gulp.task('build', ['clean', 'bundle', 'compile']);

gulp.task('default', ['build', 'webserver']);