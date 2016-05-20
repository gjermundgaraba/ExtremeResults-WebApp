import angular from "angular";
import IDialogService = angular.material.IDialogService;

import {XrUtils} from "../../core/xrUtils.service";

export class OutcomeEntryController {
    static $inject = ['XrUtils', '$mdDialog'];

    header:string;
    outcomeTime:string;
    outcomeObj;

    constructor(xrUtils: XrUtils, private $mdDialog: IDialogService) {
        this.header = xrUtils.getEntryHeader(this.outcomeObj);
        this.outcomeTime = xrUtils.getFormattedEntryDate(this.outcomeObj);
    }

    editOutcome() {
        var outcomeCopy = {};
        angular.copy(this.outcomeObj, outcomeCopy);
        this.$mdDialog.show({
            controller: 'EditOutcomeEntryController',
            controllerAs: '$ctrl',
            bindToController: true,
            templateUrl: 'entry/outcomeEntry/editOutcomeEntry/editOutcomeEntry.partial.html',
            parent: angular.element(document.body),
            locals: {
                outcome: outcomeCopy
            },
            clickOutsideToClose: true
        }).then((updatedOutcome) => {
            this.outcomeObj = updatedOutcome;
        });
    }


}