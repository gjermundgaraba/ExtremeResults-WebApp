(function () {
    'use strict';

    angular
        .module('xr.createReflection')
        .controller('CreateReflectionController', CreateReflectionController);

    CreateReflectionController.$inject = ['ParseService', 'FormService', '$location', 'reflectionType'];

    function CreateReflectionController(ParseService, FormService, $location, reflectionType) {
        var vm = this;
        vm.save = save;
        vm.header = generateHeader();
        vm.relatedEntries = [];

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
                    effectiveDate: {
                        "__type": "Date",
                        "iso": new Date().toISOString()
                    },
                    typeName: reflectionType.typeName
                };

                ParseService.postObject(reflectionType.className, weeklyReflection)
                    .then(function () {
                        $location.path('overview');
                    });
            }
        }

        function generateHeader() {
            return reflectionType.typeName + ' ' + reflectionType.className;
        }

        ParseService.callFunction("getRelatedEntriesForReflection", {typeName: reflectionType.typeName})
            .then(function (data) {
                console.log(data);
                vm.relatedEntries = data;
            });
    }

})();