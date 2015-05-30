(function () {
    'use strict';

    angular
        .module('xr.dailyOutcomes')
        .controller('DailyOutcomesController', DailyOutcomesController);

    DailyOutcomesController.$inject = ['ParseService', 'FormService'];

    function DailyOutcomesController(ParseService, FormService) {
        var vm = this;
        vm.save = save;

        function save() {
            FormService.setAllFieldsToDirty(vm.dailyOutcomesForm);

            if (FormService.allFieldsAreValid(vm.dailyOutcomesForm)) {
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