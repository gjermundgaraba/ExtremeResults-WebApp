namespace xrApp {

    angular
        .module('xr.menuBar')
        .component('xrUserInfo', {
            templateUrl: 'menuBar/userInfo/userInfo.partial.html',
            controller: 'UserInfoController'
        });
}