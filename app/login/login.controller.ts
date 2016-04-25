import { AuthService } from "../auth/auth.service";
import IFormController = angular.IFormController;
import IStateService = angular.ui.IStateService;

export class LoginController {
    static $inject = ['AuthService', '$state'];

    isLoggingIn: boolean = false;
    loginForm: IFormController;
    username: string;
    password: string;

    constructor(private authService: AuthService, private $state: IStateService) {}

    login() {
        if (this.loginForm.$valid) {
            this.isLoggingIn = true;
            this.authService.login(this.username, this.password)
                .then(() => {
                    this.$state.go('app.overview');
                })
                .catch(() => {
                    alert('Wrong username or password');
                })
                .finally(() => {
                    this.isLoggingIn = false;
                });
        }
    }

    register() {
        this.$state.go('register');
    }

}