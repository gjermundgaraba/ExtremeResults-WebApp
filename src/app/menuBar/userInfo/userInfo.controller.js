(function () {
    'use strict';

    angular
        .module('xr.menuBar')
        .controller('UserInfoController', UserInfoController);

    UserInfoController.$inject = ['AuthService'];

    function UserInfoController(AuthService) {
        var $ctrl = this;

        $ctrl.currentUser = AuthService.getCurrentUser();
    }

})();