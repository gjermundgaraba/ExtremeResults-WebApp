import "../auth/auth.module";
import { UserInfoController } from "./userInfo/userInfo.controller";
import { userInfoComponent } from "./userInfo/userInfo.directive";
import { MenuBarController } from "./menuBar.controller";
import { menuBarComponent } from "./menuBar.directive";

    angular
        .module('xr.menuBar', ['xr.auth'])
        .controller('UserInfoController', UserInfoController)
        .component('xrUserInfo', userInfoComponent)
        .controller('MenuBarController', MenuBarController)
        .component('xrMenuBar', menuBarComponent);
    
    