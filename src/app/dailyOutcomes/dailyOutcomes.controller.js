(function () {
    'use strict';

    angular
        .module('xr.dailyOutcomes')
        .controller('DailyOutcomesController', DailyOutcomesController);

    DailyOutcomesController.$inject = ['ParseObjectService', 'FormService'];

    function DailyOutcomesController(ParseObjectService, FormService) {
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

                ParseObjectService.postObject('DailyOutcome', dailyOutcome);
            }

        }
    }


})();