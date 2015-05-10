(function () {
    'use strict';

    angular
        .module('xr', ['xr.templates', 'xr.dailyOutcomes'])
        .config(['ParseKeyServiceProvider', function(ParseKeyServiceProvider) {
            ParseKeyServiceProvider.applicationId = 'up5CMogFVZwyOSwLx7JljkinU6ZVyuUKM0asSK1P';
            ParseKeyServiceProvider.restApiKey = 'TtFcYgRiVB9PLPIbWhm4pBxRUwfRYup2mvCtUlZb';
        }]);
})();