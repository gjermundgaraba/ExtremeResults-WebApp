module.exports = function (config) {
    config.set({

        basePath: './',

        files: [

        ],

        proxies: {
            "/base/jspm_packages": "/base/app/jspm_packages"
        },

        jspm: {
            stripExtension: false,
            config: "app/config.js",
            packages: "node_modules/systemjs/dist",
            serveFiles: [
                "app/**/*.js",
                "app/**/*.css"
            ],
            loadFiles: [
                "tests/unit/**/*.js"
            ]
        },

        autoWatch: true,

        frameworks: ['jspm', 'jasmine'],

        browsers: ['Firefox'],

        reporters: ['progress', 'coverage'],

        preprocessors: {
            '{app,app/!(jspm_packages)/**}/!(config).js': ['coverage']
        },

        coverageReporter: {
            type : 'json',
            subdir: '.',
            dir : 'coverage/'
        },

        plugins: [
            'karma-jspm',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-coverage',
            'karma-junit-reporter'
        ]

    });
};
