module.exports = function (config) {
    config.set({

        basePath: './',

        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-messages/angular-messages.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/angular-cookies/angular-cookies.js',
            'src/app/**/*.module.js',
            'src/app/**/*.js',
            'src/tests/unit/**/*.js'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Firefox'],

        reporters: ['progress', 'coverage'],

        preprocessors: {
            'src/app/**/*.js': ['coverage']
        },

        coverageReporter: {
            type : 'html',
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
