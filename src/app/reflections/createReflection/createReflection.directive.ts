namespace xrApp {
    'use strict';

    angular
        .module('xr.reflections')
        .component('xrCreateReflection', {
            templateUrl: 'reflections/createReflection/createReflection.partial.html',
            controller: 'CreateReflectionController',
            bindings: {
                type: '='
            }
        });


}