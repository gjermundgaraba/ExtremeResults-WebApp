namespace xrApp {

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