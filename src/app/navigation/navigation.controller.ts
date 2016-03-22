(function () {
    'use strict';

    angular
        .module('xr.navigation')
        .controller('NavigationController', NavigationController);

    NavigationController.$inject = ['$mdSidenav', '$state'];

    function NavigationController($mdSidenav, $state) {
        var $ctrl = this;

        $ctrl.goToState = function (state) {
            $state.go(state);
            $mdSidenav('left').close();
        };
    }

})();