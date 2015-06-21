module.exports = {
    bundle: {
        main: {
            scripts: [
                './src/app/app.js',
                './src/**/*.module.js',
                './src/app/**/*.js'
            ],
            options: {
                uglify: false
            },
            styles: './src/**/*.css'
        },
        vendor: {
            scripts: [
                { src: './bower_components/angular/angular.js', minSrc: './bower_components/angular/angular.min.js' },
                { src: './bower_components/angular-messages/angular-messages.js', minSrc: './bower_components/angular-messages/angular-messages.min.js' },
                { src: './node_modules/angular-ui-router/release/angular-ui-router.js', minSrc: './node_modules/angular-ui-router/release/angular-ui-router.min.js' }
            ],
            styles: [
            ],
            options: {
                useMin: false, // {(boolean|string|Array)} pre-minified files from bower
                uglify: false
            }
        }
    },
    copy: './src/**/*.{png,svg}'
};