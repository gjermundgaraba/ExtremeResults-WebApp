(function () {
    'use strict';

    angular
        .module('xr.dailyOutcome')
        .controller('DailyOutcomeController', DailyOutcomeController);

    DailyOutcomeController.$inject = ['ParseService', 'FormService'];

    function DailyOutcomeController(ParseService, FormService) {
        var vm = this;
        vm.save = save;

        function save() {
            FormService.setAllFieldsToDirty(vm.dailyOutcomeForm);

            if (FormService.allFieldsAreValid(vm.dailyOutcomeForm)) {
                var dailyOutcome = {
                    firstStory: vm.outcome1,
                    secondStory: vm.outcome2,
                    thirdStory: vm.outcome3,
                    date: {
                        '__type': 'Date',
                        'iso': new Date().toISOString()
                    }
                };

                ParseService.postObject('DailyOutcome', dailyOutcome);
            }

        }
    }

})();