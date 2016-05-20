import IDialogService = angular.material.IDialogService;

import {XrUtils} from "../../../core/xrUtils.service";
import {EditOutcomeEntryService} from "./editOutcomeEntry.service";
import IFormController = angular.IFormController;

export class EditOutcomeEntryController {
    static $inject = ['$mdDialog', 'XrUtils', 'EditOutcomeEntryService'];

    editOutcomeForm: IFormController;
    saving: boolean = false;
    header: string;
    outcome;
    
    constructor(private $mdDialog: IDialogService, xrUtils: XrUtils, private editOutcomeEntryService: EditOutcomeEntryService) {
        this.header = xrUtils.getEntryHeader(this.outcome) + ' for ' + xrUtils.getFormattedEntryDate(this.outcome);
    }

    save(): void {
    if (!this.saving && this.editOutcomeForm.$valid) {
        this.saving = true;
        var updateObject = {
            typeName: this.outcome.typeName,
            firstStory: this.outcome.firstStory,
            secondStory: this.outcome.secondStory,
            thirdStory: this.outcome.thirdStory,
            effectiveDate: this.outcome.effectiveDate,
        };

        this.editOutcomeEntryService.editOutcome(this.outcome.objectId, updateObject)
            .then(() => {
                this.$mdDialog.hide(this.outcome);
            })
            .finally(() => {
                this.saving = false;
            });
    }


};

} 