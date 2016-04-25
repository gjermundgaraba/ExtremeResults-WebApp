import "angular-messages";
import angular from "angular";

import "../core/core.module";
import {CreateOutcomeService} from "./createOutcome/createOutcome.service";
import {CreateOutcomeController} from "./createOutcome/createOutcome.controller";
import {createOutcomeComponent} from "./createOutcome/createOutcome.directive";
import {OutcomesController} from "./outcomes.controller";


angular.module('xr.outcomes', ['xr.core', 'ngMessages'])
    .service('CreateOutcomeService', CreateOutcomeService)
    .controller('CreateOutcomeController', CreateOutcomeController)
    .component('xrCreateOutcome', createOutcomeComponent)
    .controller('OutcomesController', OutcomesController);