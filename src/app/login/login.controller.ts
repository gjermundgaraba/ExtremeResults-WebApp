namespace xrApp {

    angular
        .module('xr.login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['AuthService', '$state'];

    function LoginController(AuthService, $state) {
        var $ctrl = this;
        $ctrl.isLoggingIn = false;

        $ctrl.login = login;
        $ctrl.register = register;

        function login() {
            if ($ctrl.loginForm.$valid) {
                $ctrl.isLoggingIn = true;
                AuthService.login($ctrl.username, $ctrl.password)
                    .then(function () {
                        $state.go('app.overview');
                    })
                    .catch(function () {
                        alert('Wrong username or password');
                    })
                    .finally(function () {
                        $ctrl.isLoggingIn = false;
                    });
            }
        }

        function register() {
            $state.go('register');
        }
    }
}