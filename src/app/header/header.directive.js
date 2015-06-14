(function () {
    'use strict';

    angular
        .module('xr.header')
        .directive('xrHeader', xrHeaderDirective);

    xrHeaderDirective.$inject = [];

    function xrHeaderDirective() {
        return {
            restrict: 'AE',
            templateUrl: 'header/header.partial.html'
        };
    }
})();