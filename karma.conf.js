module.exports = function (config) {
    config.set({

        basePath: './',

        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/angular-messages/angular-messages.js',
            'node_modules/angular-cookies/angular-cookies.js',
            'node_modules/angular-ui-router/release/angular-ui-router.js',
            'node_modules/angular-animate/angular-animate.js',
            'node_modules/angular-aria/angular-aria.js',
            'node_modules/angular-material/angular-material.js',
            'node_modules/angular-jwt/dist/angular-jwt.js',
            'node_modules/angular-moment/angular-moment.js',
            'tmp/typescript/**/*.module.js',
            'tmp/typescript/**/!(bootstrap).js',
            'src/tests/unit/**/*.js'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Firefox'],

        reporters: ['progress', 'coverage'],

        preprocessors: {
            'tmp/typescript/**/*.js': ['coverage']
        },

        coverageReporter: {
            type : 'json',
            subdir: '.',
            dir : 'coverage/'
        },

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-coverage',
            'karma-junit-reporter'
        ]

    });
};
