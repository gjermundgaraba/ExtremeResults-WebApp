(function () {
    'use strict';

    angular
        .module('xr.weeklyReflection')
        .controller('WeeklyReflectionController', WeeklyReflectionController);

    WeeklyReflectionController.$inject = ['ParseService', 'FormService', '$location'];

    function WeeklyReflectionController(ParseService, FormService, $location) {
        var vm = this;

        vm.save = save;

        function save() {
            FormService.setAllFieldsToDirty(vm.weeklyReflectionForm);

            if (FormService.allFieldsAreValid(vm.weeklyReflectionForm)) {
                var weeklyReflection = {
                    firstThingThatWentWell: vm.firstThingThatWentWell,
                    secondThingThatWentWell: vm.secondThingThatWentWell,
                    thirdThingThatWentWell: vm.thirdThingThatWentWell,
                    firstThingToImprove: vm.firstThingToImprove,
                    secondThingToImprove: vm.secondThingToImprove,
                    thirdThingToImprove: vm.thirdThingToImprove,
                };

                ParseService.postObject('WeeklyReflection', weeklyReflection)
                    .then(function () {
                        $location.path('overview');
                    });
            }
        }
    }

})();