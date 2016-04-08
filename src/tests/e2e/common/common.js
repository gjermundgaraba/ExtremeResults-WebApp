var http = require('http');

var Common = function () {

    this.goHome = function () {
        browser.get(browser.params.client)
    };

    this.overviewMenuButton = element(by.buttonText('Overview'));
    this.dailyOutcomeMenuButton = element(by.buttonText('Daily Outcome'));
    this.mondayVisionMenuButton = element(by.buttonText('Monday Vision'));
    this.weeklyReflectionMenuButton = element(by.buttonText('Weekly Reflection'));
    this.hotSpotsMenuButton = element(by.buttonText('Hot Spots'));

    this.clearDB = function () {
        var deferred = protractor.promise.defer();

        var options = {
            hostname: 'localhost',
            port: 4321,
            path: '/api/forTest',
            method: 'DELETE'
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