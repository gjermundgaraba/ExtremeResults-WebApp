module.exports = {
    bundle: {
        main: {
            scripts: [
                './tmp/typescript/app.js',
                './tmp/typescript/**/*.module.js',
                './tmp/typescript/**/*.js'
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
                { src: './node_modules/angular-material-icons/angular-material-icons.js', minSrc: './node_modules/angular-material-icons/angular-material-icons.min.js' },
                { src: './node_modules/moment/moment.js', minSrc: './node_modules/moment/min/moment.min.js' },
                { src: './node_modules/angular-moment/angular-moment.js', minSrc: './node_modules/angular-moment/angular-moment.min.js' },
                { src: './node_modules/angular-busy2/dist/angular-busy.js', minSrc: './node_modules/angular-busy2/dist/angular-busy.min.js' },
                { src: './node_modules/angular-jwt/dist/angular-jwt.js', minSrc: './node_modules/angular-jwt/dist/angular-jwt.min.js' }
            ],
            styles: [
                { src: './node_modules/angular-material/angular-material.css', minSrc: './node_modules/angular-material/angular-material.min.css' },
                { src: './node_modules/angular-busy2/dist/angular-busy.css', minSrc: './node_modules/angular-busy2/dist/angular-busy.min.css' }
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