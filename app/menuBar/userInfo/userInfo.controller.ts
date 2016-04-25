
import {AuthService} from "../../auth/auth.service";

export class UserInfoController {
    static $inject = ['AuthService'];

    currentUser;

    constructor(authService: AuthService) {
        this.currentUser = authService.getCurrentUser();
    }
}