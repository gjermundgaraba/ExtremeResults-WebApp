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
                { src: './node_modules/angular/angular.js', minSrc: './node_modules/angular/angular.min.js' },
                { src: './node_modules/angular-cookies/angular-cookies.js', minSrc: './node_modules/angular-cookies/angular-cookies.min.js' },
                { src: './node_modules/angular-animate/angular-animate.js', minSrc: './node_modules/angular-animate/angular-animate.min.js' },
                { src: './node_modules/angular-aria/angular-aria.js', minSrc: './node_modules/angular-aria/angular-aria.min.js' },
                { src: './node_modules/angular-material/angular-material.js', minSrc: './node_modules/angular-material/angular-material.min.js' },
                { src: './node_modules/angular-messages/angular-messages.js', minSrc: './node_modules/angular-messages/angular-messages.min.js' },
                { src: './node_modules/angular-ui-router/release/angular-ui-router.js', minSrc: './node_modules/angular-ui-router/release/angular-ui-router.min.js' },
                { src: './node_modules/angular-material-icons/angular-material-icons.js', minSrc: './node_modules/angular-material-icons/angular-material-icons.min.js' }
            ],
            styles: [
                { src: './node_modules/angular-material/angular-material.css', minSrc: './node_modules/angular-material/angular-material.min.css' }
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