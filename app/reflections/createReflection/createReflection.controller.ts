import IScope = angular.IScope;
import IPromise = angular.IPromise;
import ILocationService = angular.ILocationService;

import {CreateReflectionService} from "./createReflection.service";
import {XrUtils} from "../../core/xrUtils.service";
import {ICoreType} from "../../core/coreTypes.constants";
import IFormController = angular.IFormController;

export class CreateReflectionController {
    static $inject = ['$scope', 'CreateReflectionService', '$location', 'XrUtils'];

    relatedEntries = [];
    getRelatedEntriesPromise: IPromise<any>;
    effectiveDate = new Date();
    type: ICoreType;
    weeklyReflectionForm: IFormController;

    firstThingThatWentWell: string;
    secondThingThatWentWell: string;
    thirdThingThatWentWell: string;
    firstThingToImprove: string;
    secondThingToImprove: string;
    thirdThingToImprove: string;
    
    constructor($scope: IScope, private createReflectionService: CreateReflectionService, private $location: ILocationService, private xrUtils: XrUtils) {
        $scope.$watch('$ctrl.effectiveDate', (newValue, oldValue) => {
            if (newValue !== oldValue) {
                this.updateRelatedEntriesForReflection();
            }
        });

        $scope.$watch('$ctrl.type.typeName', (newValue, oldValue) => {
            if (newValue !== oldValue) {
                this.updateRelatedEntriesForReflection();
            }
        });

        this.updateRelatedEntriesForReflection();
    }

    private updateRelatedEntriesForReflection() {
        this.getRelatedEntriesPromise = this.createReflectionService.getRelatedEntriesForReflection(this.type.typeName, this.effectiveDate)
            .then((data) => {
                this.relatedEntries = data;
            });
    }

    save() {
        if (this.weeklyReflectionForm.$valid) {
            var weeklyReflection = {
                firstThingThatWentWell: this.firstThingThatWentWell,
                secondThingThatWentWell: this.secondThingThatWentWell,
                thirdThingThatWentWell: this.thirdThingThatWentWell,
                firstThingToImprove: this.firstThingToImprove,
                secondThingToImprove: this.secondThingToImprove,
                thirdThingToImprove: this.thirdThingToImprove,
                effectiveDate: this.effectiveDate.toISOString(),
                typeName: this.type.typeName
            };

            this.createReflectionService.createReflection(weeklyReflection)
                .then(() => {
                    this.$location.path('overview');
                });
        }
    }

    generateHeader() {
        return this.xrUtils.getEntryHeader(this.type) + ' for ' +
            this.xrUtils.getFormattedEntryDate(this.type, this.effectiveDate);
    }
}