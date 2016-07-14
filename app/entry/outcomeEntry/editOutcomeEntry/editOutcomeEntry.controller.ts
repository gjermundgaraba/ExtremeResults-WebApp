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

    deleteCallback: Function;
    editCallback: Function;


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
                    this.editCallback(this.outcome);
                    this.$mdDialog.hide();
                })
                .finally(() => {
                    this.saving = false;
                });
        }
    };

    deleteOutcome(): void {
        if (!this.saving) {
            var confirm = this.$mdDialog.confirm()
                .title('Are you sure you want to delete this Outcome?')
                .ok('Yes')
                .cancel('No');

            this.$mdDialog.show(confirm)
                .then(() => {
                    this.saving = true;

                    this.editOutcomeEntryService.deleteOutcome(this.outcome.objectId)
                        .then(() => {
                            this.deleteCallback();
                        })
                        .finally(() => {
                            this.saving = false;
                        });
                });
        }
    }

} 