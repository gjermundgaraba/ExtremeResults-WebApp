(function () {
    'use strict';

    angular
        .module('xr.register')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['AuthService', '$state'];

    function RegisterController(AuthService, $state) {
        var vm = this;
        vm.isRegistering = false;

        vm.register = function () {
            vm.isRegistering = true;

            var user = {
                username: vm.username,
                password: vm.password
            };

            AuthService.register(user)
                .then(function () {
                    $state.go('app.overview');
                })
                .catch(function () {
                    alert('Something went wrong!');
                })
                .finally(function() {
                    vm.isRegistering = false;
                });
        };
    }

})();