(function () {
    'use strict';

    angular
        .module('xr.dailyOutcomes')
        .controller('DailyOutcomesController', DailyOutcomesController);

    DailyOutcomesController.$inject = ['ParseObjectService'];

    function DailyOutcomesController(ParseObjectService) {
        var vm = this;
        vm.save = save;

        function save() {

            var allFieldsAreValid = true;

            for (var field in vm.dailyOutcomesForm) {
                if (field[0] !== '$' && vm.dailyOutcomesForm[field].$pristine) {
                    vm.dailyOutcomesForm[field].$setDirty();
                }

                if (field[0] !== '$' && !vm.dailyOutcomesForm[field].$valid) {
                    allFieldsAreValid = false;
                }
            }

            if (allFieldsAreValid) {
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