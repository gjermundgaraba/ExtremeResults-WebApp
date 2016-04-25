import angular from "angular";
import IDialogService = angular.material.IDialogService;
import IFormController = angular.IFormController;
import IPromise = angular.IPromise;

import { HotSpotsService, IHotSpotBucket } from "./hotSpots.service";

export class HotSpotsController {
    static $inject = ['HotSpotsService', '$mdDialog'];

    hotSpotBuckets: Array<IHotSpotBucket> = [];
    getHotSpotsPromise: IPromise<void>;
    hotSpotBucketForm: IFormController;
    hotSpotBucketName: string;

    constructor(private hotSpotsService: HotSpotsService, private $mdDialog: IDialogService) {
        this.getAllHotSpotBuckets();
    }

    getAllHotSpotBuckets(): void {
        this.getHotSpotsPromise = this.hotSpotsService.getHotSpotBuckets()
            .then((hotSpotBuckets) => {
                this.hotSpotBuckets = hotSpotBuckets;
            });
    }

    private handleHotSpotChange(hotSpotBucket): void {
        var updateObj = {
            name: hotSpotBucket.name,
            hotSpots: hotSpotBucket.hotSpots
        };

        this.hotSpotsService.editHotSpotBucket(hotSpotBucket.objectId, updateObj);
    }

    handleHotSpotAdd(hotSpotBucket): void {
        this.handleHotSpotChange(hotSpotBucket);
    }

    handleHotSpotDelete(hotSpotBucket): void {
        this.handleHotSpotChange(hotSpotBucket);
    }

    saveHotSpotBucket(): void {
        if (this.hotSpotBucketForm.$valid) {
            var hotSpotBucket = {
                name: this.hotSpotBucketName,
                hotSpots: []
            };

            this.hotSpotsService.createHotSpotBucket(hotSpotBucket)
                .then(() => {
                    this.hotSpotBucketName = ''; // Reset field
                    this.hotSpotBucketForm.$setPristine();
                    this.getAllHotSpotBuckets();
                });
        }
    }

    editHotSpotBucket(hotSpotBucket): void {
        var hotSpotBucketCopy = {};
        angular.copy(hotSpotBucket, hotSpotBucketCopy);
        this.$mdDialog.show({
            controller: 'EditHotSpotBucketController',
            controllerAs: '$ctrl',
            bindToController: true,
            templateUrl: 'hotSpots/editHotSpotBucket/editHotSpotBucket.partial.html',
            parent: angular.element(document.body),
            locals: {
                hotSpotBucket: hotSpotBucketCopy,
                deleteCallback: () => {
                    this.getAllHotSpotBuckets();
                },
                renameCallback: (updatedHotSpotBucket) => {
                    hotSpotBucket.name = updatedHotSpotBucket.name;
                }
            },
            clickOutsideToClose: true
        });
    }

}