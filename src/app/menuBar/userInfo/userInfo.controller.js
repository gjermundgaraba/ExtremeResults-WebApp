(function () {
    'use strict';

    angular
        .module('xr.menuBar')
        .controller('UserInfoController', UserInfoController);

    UserInfoController.$inject = ['AuthService'];

    function UserInfoController(AuthService) {
        var vm = this;

        vm.currentUser = AuthService.getCurrentUser();
    }

})();