UserInfoController.$inject = ['AuthService'];

function UserInfoController(AuthService) {
    var $ctrl = this;

    $ctrl.currentUser = AuthService.getCurrentUser();
}

export {UserInfoController};