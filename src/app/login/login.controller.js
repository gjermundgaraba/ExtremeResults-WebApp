(function () {
    'use strict';

    angular
        .module('xr.login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['AuthService', '$state'];

    function LoginController(AuthService, $state) {
        var vm = this;
        vm.isLoggingIn = false;

        vm.login = login;
        vm.register = register;

        function login() {
            vm.isLoggingIn = true;
            AuthService.login(vm.username, vm.password)
                .then(function () {
                    $state.go('app.overview');
                })
                .catch(function () {
                    alert('Wrong username or password');
                })
                .finally(function() {
                    vm.isLoggingIn = false;
                });
        }

        function register() {
            $state.go('register');
        }
    }

})();