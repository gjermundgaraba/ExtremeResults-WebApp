import IStateService = angular.ui.IStateService;

import { AuthService } from "../auth/auth.service";
import IFormController = angular.IFormController;

export class RegisterController {
    static $inject = ['AuthService', '$state'];
    
    constructor (private authService: AuthService, private $state: IStateService) {}

    isRegistering: boolean = false;
    registerForm: IFormController;
    username: string;
    password: string;

    register(): void {
        if (this.registerForm.$valid) {
            this.isRegistering = true;

            var user = {
                username: this.username,
                password: this.password
            };

            this.authService.register(user)
                .then(() => {
                    this.$state.go('app.overview');
                })
                .catch(() => {
                    alert('Something went wrong!');
                })
                .finally(() => {
                    this.isRegistering = false;
                });
        }
    }

    backToLogin(): void {
        this.$state.go('login');
    }
}