import angular from "angular";

import "../auth/auth.module";
import { RegisterController } from "./register.controller";

angular
    .module('xr.register', ['xr.auth'])
    .controller('RegisterController', RegisterController);