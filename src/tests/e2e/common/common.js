var http = require('https');

var Common = function () {

    this.loginButton = element(by.id('loginButton'));

    this.overviewMenuButton = element(by.css('[ui-sref="app.overview"]'));
    this.dailyOutcomeMenuButton = element(by.css('[ui-sref="app.daily-outcome"]'));
    this.mondayVisionMenuButton = element(by.css('[ui-sref="app.monday-vision"]'));

    this.setLoginUserName = function (userName) {
        element(by.model('vm.username')).sendKeys(userName);
    };

    this.setPassword = function (password) {
        element(by.model('vm.password')).sendKeys(password);
    };

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

};

module.exports = Common;