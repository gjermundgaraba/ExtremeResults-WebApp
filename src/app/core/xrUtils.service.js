(function () {
    'use strict';

    angular.module('xr.core')
        .factory('XrUtils', XrUtilsFactory);

    XrUtilsFactory.$inject = ['$filter', 'moment'];

    function XrUtilsFactory($filter, moment) {
        var service = {
            getFormattedEntryDate: getFormattedEntryDate,
            getEntryHeader: getEntryHeader
        };

        return service;

        function getFormattedEntryDate(entry, optionalDate) {
            var date = optionalDate || entry.effectiveDate.iso;

            switch (entry.typeName) {
                case 'Daily':
                    return $filter('date')(date);
                case 'Weekly':
                    return 'Week ' + moment(date).isoWeek();
                default:
                    return '';

            }
        }

        function getEntryHeader(entry) {
            return entry.typeName + ' ' + entry.className;
        }
    }
})();