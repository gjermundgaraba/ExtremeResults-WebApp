import IDialogService = angular.material.IDialogService;

import {XrUtils} from "../../../core/xrUtils.service";
import {EditReflectionEntryService} from "./editReflectionEntry.service";
import IFormController = angular.IFormController;

export class EditReflectionEntryController {
    static $inject = ['$mdDialog', 'XrUtils', 'EditReflectionEntryService'];

    editReflectionForm: IFormController;
    saving: boolean = false;
    header: string;
    reflection;

    editCallback: Function;
    deleteCallback: Function;

    constructor(private $mdDialog: IDialogService, xrUtils: XrUtils, private editReflectionEntryService: EditReflectionEntryService) {
        this.header = xrUtils.getEntryHeader(this.reflection) + ' for ' + xrUtils.getFormattedEntryDate(this.reflection);
    }

    save(): void {
        if (!this.saving && this.editReflectionForm.$valid) {
            this.saving = true;
            var updateObject = {
                typeName: this.reflection.typeName,
                firstThingThatWentWell: this.reflection.firstThingThatWentWell,
                secondThingThatWentWell: this.reflection.secondThingThatWentWell,
                thirdThingThatWentWell: this.reflection.thirdThingThatWentWell,
                firstThingToImprove: this.reflection.firstThingToImprove,
                secondThingToImprove: this.reflection.secondThingToImprove,
                thirdThingToImprove: this.reflection.thirdThingToImprove,
                effectiveDate: this.reflection.effectiveDate,
            };

            this.editReflectionEntryService.editReflection(this.reflection.objectId, updateObject)
                .then(() => {
                    this.editCallback(this.reflection);
                    this.$mdDialog.hide();
                })
                .finally(() => {
                    this.saving = false;
                });
        }
    };

    deleteReflection(): void {
        if (!this.saving) {
            var confirm = this.$mdDialog.confirm()
                .title('Are you sure you want to delete this Reflection?')
                .ok('Yes')
                .cancel('No');

            this.$mdDialog.show(confirm)
                .then(() => {
                    this.saving = true;

                    this.editReflectionEntryService.deleteReflection(this.reflection.objectId)
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