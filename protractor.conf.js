exports.config = {
    framework: 'jasmine2',
    params: {
        client: 'http://localhost:3000/app/index.html#/'
    },
    specs: [
        './tests/e2e/**/*.spec.js'
    ],
    capabilities: {
        browserName: 'firefox'
    }
};