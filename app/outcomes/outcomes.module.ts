import "angular-messages";
import angular from "angular";

import "../core/core.module";
import { CreateOutcomeServiceFactory } from "./createOutcome/createOutcome.service";
import { CreateOutcomeController } from "./createOutcome/createOutcome.controller";
import { createOutcomeComponent } from "./createOutcome/createOutcome.directive";
import { OutcomesController } from "./outcomes.controller";


angular.module('xr.outcomes', ['xr.core', 'ngMessages'])
    .factory('CreateOutcomeService', CreateOutcomeServiceFactory)
    .controller('CreateOutcomeController', CreateOutcomeController)
    .component('xrCreateOutcome', createOutcomeComponent)
    .controller('OutcomesController', OutcomesController);