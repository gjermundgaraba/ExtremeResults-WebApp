var http = require('https');

var Common = function () {

    this.goHome = function () {
        browser.get(browser.params.client)
    };

    this.overviewMenuButton = element(by.css('[ui-sref="app.overview"]'));
    this.dailyOutcomeMenuButton = element(by.css('[ui-sref="app.daily-outcome"]'));
    this.mondayVisionMenuButton = element(by.css('[ui-sref="app.monday-vision"]'));
    this.weeklyReflectionMenuButton = element(by.css('[ui-sref="app.weekly-reflection"]'));

    this.clearDB = function () {
        var deferred = protractor.promise.defer();

        var options = {
            hostname: 'api.parse.com',
            path: '/1/functions/clearDB',
            method: 'POST',
            headers: {
                'X-Parse-Application-Id': 'up5CMogFVZwyOSwLx7JljkinU6ZVyuUKM0asSK1P',
                'X-Parse-REST-API-Key': 'TtFcYgRiVB9PLPIbWhm4pBxRUwfRYup2mvCtUlZb'
            }
        };

        callback = function() {
            deferred.fulfill();
        };

        var req = http.request(options, callback);
        req.end();

        return deferred.promise;
    };

    this.generateRandomUsername = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };

};

module.exports = Common;