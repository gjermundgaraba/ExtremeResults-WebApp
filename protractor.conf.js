exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    framework: 'jasmine2',
    params: {
        client: 'http://localhost:8080/#/'
    },
    specs: [
        './tests/e2e/**/*.spec.js'
        // './tests/e2e/hotSpots/hotSpots.spec.js'
        // './tests/e2e/outcomes/outcomes.spec.js'

    ],
    capabilities: {
        browserName: 'chrome'
    }
};