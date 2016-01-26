(function () {
    'use strict';

    angular
        .module('xr.settings')
        .directive('xrUserSettings', xrUserSettingsDirective);

    xrUserSettingsDirective.$inject = [];

    function xrUserSettingsDirective() {
        return {
            restrict: 'AE',
            scope: {},
            templateUrl: 'settings/userSettings/userSettings.partial.html'
        };
    }

})();