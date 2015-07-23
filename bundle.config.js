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
                { src: './bower_components/angular-animate/angular-animate.js', minSrc: './bower_components/angular-animate/angular-animate.min.js' },
                { src: './bower_components/angular-aria/angular-aria.js', minSrc: './bower_components/angular-aria/angular-aria.min.js' },
                { src: './bower_components/angular-material/angular-material.js', minSrc: './bower_components/angular-material/angular-material.min.js' },
                { src: './bower_components/angular-messages/angular-messages.js', minSrc: './bower_components/angular-messages/angular-messages.min.js' },
                { src: './node_modules/angular-ui-router/release/angular-ui-router.js', minSrc: './node_modules/angular-ui-router/release/angular-ui-router.min.js' }
            ],
            styles: [
                { src: './bower_components/angular-material/angular-material.css', minSrc: './bower_components/angular-material/angular-material.min.css' }//,
                //{ src: './node_modules/font-awesome/css/font-awesome.css', minSrc: './node_modules/font-awesome/css/font-awesome.min.css' }
            ],
            options: {
                useMin: false, // {(boolean|string|Array)} pre-minified files from bower
                uglify: false
            }
        }
    },
    copy: [
        /*{
            src: './node_modules/font-awesome/fonts/*.*',
            base: './node_modules/font-awesome/'
        },*/
        {
            src: './src/app/assets/*.*',
            base: './src/app/'
        }
        ]
};