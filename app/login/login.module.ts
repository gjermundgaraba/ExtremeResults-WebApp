import "../auth/auth.module";
import { LoginController } from "./login.controller";

angular
    .module('xr.login', ['xr.auth'])
    .controller('LoginController', LoginController);