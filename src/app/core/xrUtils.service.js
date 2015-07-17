(function () {
    'use strict';

    angular.module('xr.core')
        .factory('XrUtils', XrUtilsFactory);

    XrUtilsFactory.$inject = ['$filter'];

    function XrUtilsFactory($filter) {
        var service = {
            getFormattedEntryDate: getFormattedEntryDate,
            getEntryHeader: getEntryHeader
        };

        return service;

        function getFormattedEntryDate(entry) {
            switch (entry.typeName) {
                case 'Daily':
                    return $filter('date')(entry.effectiveDate.iso);
                case 'Weekly':
                    return 'Week ' + $filter('date')(entry.effectiveDate.iso, 'w');
                default:
                    return '';

            }
        }

        function getEntryHeader(entry) {
            return entry.typeName + ' ' + entry.className;
        }
    }
})();