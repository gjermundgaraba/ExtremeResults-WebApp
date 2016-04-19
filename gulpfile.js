var gulp = require('gulp');

var bundle = require('gulp-bundle-assets'),
    del = require('del'),
    vinylPaths = require('vinyl-paths'),
    fs = require('fs'),
    replace = require('gulp-replace'),
    connect = require('gulp-connect'),
    templateCache = require('gulp-angular-templatecache'),
    KarmaServer = require('karma').Server,
    csslint = require('gulp-csslint'),
    argv = require('yargs').argv,
    typescript = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    jspm = require('gulp-jspm'),
    htmlreplace = require('gulp-html-replace');

gulp.task('clean', function () {
    return gulp.src(['public', 'tmp'])
        .pipe(vinylPaths(del));
});


// gulp.task('compile', ['clean', 'bundle'], function () {
//     var manifest = JSON.parse(fs.readFileSync('./tmp/manifest.json', 'utf8'));
//
//     return gulp.src(['src/app/index.html'])
//         .pipe(replace('<!-- vendor-js-injectionpoint -->', manifest.vendor.scripts))
//         .pipe(replace('<!-- vendor-css-injectionpoint -->', manifest.vendor.styles))
//         .pipe(replace('<!-- templates-js-injectionpoint -->', '<script src=\'templates.js\'></script>'))
//         .pipe(replace('<!-- main-js-injectionpoint -->', manifest.main.scripts))
//         .pipe(replace('<!-- main-css-injectionpoint -->', manifest.main.styles))
//         .pipe(gulp.dest('public'))
//         .pipe(connect.reload());
// });

// gulp.task('bundle', ['clean', 'templates', 'typescript'], function() {
//     return gulp.src('./bundle.config.js')
//         .pipe(bundle({
//             quietMode: true
//         }))
//         .pipe(bundle.results({
//             dest: './tmp',
//             fileName: 'manifest'
//         }))
//         .pipe(replace('<!SERVER-URL!>', argv.server))
//         .pipe(gulp.dest('./public'));
// });

gulp.task('templates', ['clean'], function() {
    return gulp.src('app/**/*.html')
        .pipe(templateCache(
            'templates.js',
            {
                module: 'xr.templates',
                root: '',
                standalone: true
            }
        ))
        .pipe(gulp.dest('app'));
});

gulp.task('compile', ['clean'], function () {

    var tsProject = typescript.createProject('tsconfig.json');

    return tsProject.src('app/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(typescript(tsProject))
        //write comments to tell istanbul to ignore the code inside the iife parameters
        .js.pipe(replace(/(}\)\()(.*\|\|.*;)/g, '$1/* istanbul ignore next */$2')) // To ignore
        .pipe(sourcemaps.write({sourceRoot: __dirname}))
        .pipe(gulp.dest('.'));
});

gulp.task('build', ['clean', 'compile', 'bundle', 'index']);

gulp.task('bundle', ['clean', 'compile'], function () {
    return gulp.src('app/bootstrap.js')
        .pipe(jspm({selfExecutingBundle: true}))
        .pipe(replace('<!SERVER-URL!>', argv.server))
        .pipe(gulp.dest('public'));
});

gulp.task('index', ['clean'], function () {
    gulp.src('app/index.html')
        .pipe(htmlreplace({
            js: 'bootstrap.bundle.js'
        }))
        .pipe(gulp.dest('public'));
});











// gulp.task('webserver', ['compile'], function () {
//     connect.server({
//         root: 'public',
//         livereload: true
//     });
//
// });












gulp.task('datWatch', function() {
    gulp.watch(['./src/app/**/*.ts', './src/app/**/*.css', './src/app/**/*.html'], ['csslint', 'build']);
});

gulp.task('default', ['build', 'csslint', 'datWatch', 'webserver']);

gulp.task('check', ['test'], function() {
    gulp.watch(['./src/app/**/*.js'], ['test']);
});

gulp.task('tdd', function (done) {
    new KarmaServer({
        configFile: __dirname + '/karma.conf.js'
    }, done).start();
});

gulp.task('testSingleRun', function() {
    new KarmaServer({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }).start();
});