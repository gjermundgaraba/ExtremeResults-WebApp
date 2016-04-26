import IPromise = angular.IPromise;
import IFormController = angular.IFormController;
import ILocationService = angular.ILocationService;

import {CreateOutcomeService} from "./createOutcome.service";
import {XrUtils} from "../../core/xrUtils.service";
import {ICoreType} from "../../core/coreTypes.constants";
import IScope = angular.IScope;

export class CreateOutcomeController {
    static $inject = ['CreateOutcomeService', '$location', 'XrUtils', '$scope'];

    relatedEntries = [];
    getRelatedEntriesPromise: IPromise<any>;
    createOutcomeForm: IFormController;

    outcome1: string;
    outcome2: string;
    outcome3: string;
    type: ICoreType;

    constructor(private createOutcomeService: CreateOutcomeService, private $location: ILocationService, private xrUtils: XrUtils, private $scope: IScope) {
        $scope.$watch('$ctrl.type.typeName', (newValue, oldValue) => {
            if (newValue !== oldValue) {
                this.updateRelatedEntriesForOutcome();
            }
        });

        this.updateRelatedEntriesForOutcome();
    }

    private updateRelatedEntriesForOutcome() {
        this.getRelatedEntriesPromise = this.createOutcomeService.getRelatedEntriesForOutcome(this.type.typeName)
            .then((data) => {
                this.relatedEntries = data;
            });
    }

    save(): void {
        if (this.createOutcomeForm.$valid) {
            var outcome = {
                firstStory: this.outcome1,
                secondStory: this.outcome2,
                thirdStory: this.outcome3,
                typeName: this.type.typeName,
                effectiveDate: new Date()
            };

            this.createOutcomeService.createOutcome(outcome)
                .then(() => {
                    this.$location.path('overview');
                });
        }
    }

    generateHeader(): string {
        return this.xrUtils.getEntryHeader(this.type) + ' for ' +
            this.xrUtils.getFormattedEntryDate(this.type, new Date());
    }
}