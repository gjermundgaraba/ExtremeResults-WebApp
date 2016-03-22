var gulp = require('gulp');

var bundle = require('gulp-bundle-assets'),
    del = require('del'),
    vinylPaths = require('vinyl-paths'),
    fs = require('fs'),
    replace = require('gulp-replace'),
    connect = require('gulp-connect'),
    templateCache = require('gulp-angular-templatecache'),
    jshint = require('gulp-jshint'),
    KarmaServer = require('karma').Server,
    csslint = require('gulp-csslint'),
    argv = require('yargs').argv,
    typescript = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps');

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

gulp.task('bundle', ['clean', 'templates', 'typescript'], function() {
    return gulp.src('./bundle.config.js')
        .pipe(bundle({
            quietMode: true
        }))
        .pipe(bundle.results({
            dest: './tmp',
            fileName: 'manifest'
        }))
        .pipe(replace('<!APPLICATION-ID!>', argv.prod ? '2CThkkVCrwd6sI3Ox3ee9e0J8YkKyxJ7MdSJag9M' : 'up5CMogFVZwyOSwLx7JljkinU6ZVyuUKM0asSK1P'))
        .pipe(replace('<!REST-API-KEY!>', argv.prod ? 'VL3nlNneieFCdSrDTUGkKpDPqW1u4LHRTUofSR5u' : 'TtFcYgRiVB9PLPIbWhm4pBxRUwfRYup2mvCtUlZb'))
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

gulp.task('typescript', ['clean'], function () {
    return gulp.src('src/app/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(typescript({
            target:'es5'
        }))
        .js
        .pipe(sourcemaps.write({sourceRoot: __dirname + '/src/app'}))
        .pipe(gulp.dest('tmp/typescript'));
});

gulp.task('webserver', ['compile'], function () {
    connect.server({
        root: 'public',
        livereload: true
    });

});

gulp.task('build', ['clean', 'bundle', 'compile']);

gulp.task('datWatch', function() {
    gulp.watch(['./src/app/**/*.*'], ['jshint', 'csslint', 'build']);
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
    new KarmaServer({
        configFile: __dirname + '/karma.conf.js'
    }, done).start();
});

gulp.task('csslint', function() {
    gulp.src('src/app/**/*.css')
        .pipe(csslint({

        }))
        .pipe(csslint.reporter());
});