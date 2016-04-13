namespace xrApp {

    angular
        .module('xr.register')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['AuthService', '$state'];

    function RegisterController(AuthService, $state) {
        var $ctrl = this;
        $ctrl.isRegistering = false;
        $ctrl.register = register;
        $ctrl.backToLogin = backToLogin;

        function register() {
            if ($ctrl.registerForm.$valid) {
                $ctrl.isRegistering = true;

                var user = {
                    username: $ctrl.username,
                    password: $ctrl.password
                };

                AuthService.register(user)
                    .then(function () {
                        $state.go('app.overview');
                    })
                    .catch(function () {
                        alert('Something went wrong!');
                    })
                    .finally(function () {
                        $ctrl.isRegistering = false;
                    });
            }
        }

        function backToLogin() {
            $state.go('login');
        }
    }
}