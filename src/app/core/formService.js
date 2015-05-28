(function () {
    'use strict';

    angular
        .module('xr.core')
        .factory('FormService', FormService);

    FormService.$inject = [];

    function FormService() {
        var service = {
            setAllFieldsToDirty: setAllFieldsToDirty,
            allFieldsAreValid: allFieldAreValid
        };

        return service;

        function setAllFieldsToDirty(form) {
            for (var field in form) {
                if (field[0] !== '$' && form[field].$pristine) {
                    form[field].$setDirty();
                }
            }
        }

        function allFieldAreValid(form) {
            var allFieldsAreValid = true;

            for (var field in form) {
                if (field[0] !== '$' && !form[field].$valid) {
                    allFieldsAreValid = false;
                }
            }

            return allFieldsAreValid;
        }
    }

})();