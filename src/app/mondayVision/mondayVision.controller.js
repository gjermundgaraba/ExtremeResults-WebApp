(function () {
    'use strict';

    angular
        .module('xr.mondayVision')
        .controller('MondayVisionController', MondayVisionController);

    MondayVisionController.$inject = ['FormService', 'ParseService', '$location'];

    function MondayVisionController(FormService, ParseService, $location) {
        var vm = this;
        vm.save = save;

        function save() {
            FormService.setAllFieldsToDirty(vm.mondayVisionForm);

            if (FormService.allFieldsAreValid(vm.mondayVisionForm)) {
                var mondayVision = {
                    firstStory: vm.outcome1,
                    secondStory: vm.outcome2,
                    thirdStory: vm.outcome3
                };

                ParseService.postObject('MondayVision', mondayVision)
                    .then(function () {
                        $location.path('overview');
                    });
            }
        }
    }
})();