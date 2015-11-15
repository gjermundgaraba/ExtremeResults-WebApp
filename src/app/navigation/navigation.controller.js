(function () {
    'use strict';

    angular
        .module('xr.navigation')
        .controller('NavigationController', NavigationController);

    NavigationController.$inject = ['$mdSidenav', '$state'];

    function NavigationController($mdSidenav, $state) {
        var vm = this;

        vm.goToState = function (state) {
            $state.go(state);
            $mdSidenav('left').close();
        };
    }

})();