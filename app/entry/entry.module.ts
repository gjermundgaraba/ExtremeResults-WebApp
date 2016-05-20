import "../core/core.module";
import { EditOutcomeEntryService } from "./outcomeEntry/editOutcomeEntry/editOutcomeEntry.service";
import { EditOutcomeEntryController } from "./outcomeEntry/editOutcomeEntry/editOutcomeEntry.controller";
import { EditReflectionEntryService } from "./reflectionEntry/editReflectionEntry/editReflectionEntry.service";
import { EditReflectionEntryController } from "./reflectionEntry/editReflectionEntry/editReflectionEntry.controller";
import { OutcomeEntryController } from "./outcomeEntry/outcomeEntry.controller";
import { outcomeEntryComponent } from "./outcomeEntry/outcomeEntry.directive";
import { ReflectionEntryController } from "./reflectionEntry/reflectionEntry.controller";
import { reflectionEntryComponent } from "./reflectionEntry/reflectionEntry.directive";
import { overviewEntryComponent } from "./entry.directive";

angular
    .module('xr.entry', ['xr.core'])
    .service('EditOutcomeEntryService', EditOutcomeEntryService)
    .controller('EditOutcomeEntryController', EditOutcomeEntryController)
    .controller('OutcomeEntryController', OutcomeEntryController)
    .component('outcomeEntry', outcomeEntryComponent)
    .service('EditReflectionEntryService', EditReflectionEntryService)
    .controller('EditReflectionEntryController', EditReflectionEntryController)
    .controller('ReflectionEntryController', ReflectionEntryController)
    .component('reflectionEntry', reflectionEntryComponent)
    .component('overviewEntry', overviewEntryComponent);