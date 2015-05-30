(function () {
    'use strict';

    angular
        .module('xr.core')
        .factory('FormService', FormServiceFactory);

    FormServiceFactory.$inject = [];

    function FormServiceFactory() {
        var service = {
            setAllFieldsToDirty: setAllFieldsToDirty,
            allFieldsAreValid: allFieldsAreValid
        };

        return service;

        function setAllFieldsToDirty(form) {
            for (var field in form) {
                if (field[0] !== '$' && form[field].$pristine) {
                    form[field].$setDirty();
                }
            }
        }

        function allFieldsAreValid(form) {
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