exports.config = {
    framework: 'jasmine2',
    params: {
        client: 'http://localhost:8080/'
    },
    specs: [
        './src/tests/e2e/**/*.spec.js'
    ],
    capabilities: {
        browserName: 'firefox'
    }
};