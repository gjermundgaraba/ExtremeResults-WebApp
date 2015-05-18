(function () {
    'use strict';

    angular.module('xr.core')
        .directive('formValidationMessages', formValidationMessagesDirective);

    function formValidationMessagesDirective() {
        return {
            restrict: 'E',
            scope: {
                input: '='
            },
            templateUrl: 'core/formValidationMessages.partial.html'
        };
    }
})();