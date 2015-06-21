(function () {
    'use strict';

    angular
        .module('xr.createOutcome')
        .controller('CreateOutcomeController', CreateOutcomeController);

    CreateOutcomeController.$inject = ['ParseService', 'FormService', '$location', 'outcomeType'];

    function CreateOutcomeController(ParseService, FormService, $location, outcomeType) {
        var vm = this;
        vm.save = save;
        vm.header = generateHeader();

        function save() {
            FormService.setAllFieldsToDirty(vm.createOutcomeForm);

            if (FormService.allFieldsAreValid(vm.createOutcomeForm)) {
                var outcome = {
                    firstStory: vm.outcome1,
                    secondStory: vm.outcome2,
                    thirdStory: vm.outcome3
                };

                ParseService.postObject(outcomeType, outcome)
                    .then(function () {
                        $location.path('overview');
                    });
            }
        }

        function generateHeader() {
            // For now, this works because all types are just camel cased names
            return outcomeType.replace(/([a-z])([A-Z])/g, '$1 $2');
        }
    }
})();