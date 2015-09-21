(function () {
    'use strict';

    angular
        .module('xr.auth')
        .controller('LoginModalController', LoginModalController);

    LoginModalController.$inject = ['$mdDialog', 'AuthService'];

    function LoginModalController($mdDialog, AuthService) {
        var vm = this;

        vm.login = login;

        function login() {
            AuthService.login(vm.username, vm.password)
                .then(function () {
                    $mdDialog.hide();
                });
        }
    }
})();