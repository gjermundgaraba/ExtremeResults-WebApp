namespace xrApp {
    'use strict';

    angular
        .module('xr.outcomes')
        .component('xrCreateOutcome', {
            templateUrl: 'outcomes/createOutcome/createOutcome.partial.html',
            controller: 'CreateOutcomeController',
            bindings: {
                type: '='
            }
        });


}