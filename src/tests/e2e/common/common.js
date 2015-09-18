var http = require('https');

var Common = function () {

    this.loginButton = element(by.css('[ng-click="vm.login()"]'));

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