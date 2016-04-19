import angular from "angular";

import { RegisterController } from "./register.controller";

angular
    .module('xr.register', [])
    .controller('RegisterController', RegisterController);