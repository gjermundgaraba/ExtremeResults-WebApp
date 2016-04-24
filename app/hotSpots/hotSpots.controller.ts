import angular from "angular";

export class HotSpotsController {
    static $inject = ['HotSpotsService', '$mdDialog'];

    hotSpotBuckets = [];
    getHotSpotsPromise;
    hotSpotBucketForm;
    hotSpotBucketName;

    constructor(private HotSpotsService, private $mdDialog) {
        this.getAllHotSpotBuckets();
    }

    getAllHotSpotBuckets() {
        this.getHotSpotsPromise = this.HotSpotsService.getHotSpotBuckets()
            .then((hotSpotBuckets) => {
                this.hotSpotBuckets = hotSpotBuckets;
            });
    }

    private handleHotSpotChange(hotSpotBucket) {
        var updateObj = {
            name: hotSpotBucket.name,
            hotSpots: hotSpotBucket.hotSpots
        };

        this.HotSpotsService.editHotSpotBucket(hotSpotBucket.objectId, updateObj);
    }

    handleHotSpotAdd(hotSpotBucket) {
        this.handleHotSpotChange(hotSpotBucket);
    }

    handleHotSpotDelete(hotSpotBucket) {
        this.handleHotSpotChange(hotSpotBucket);
    }

    saveHotSpotBucket() {
        if (this.hotSpotBucketForm.$valid) {
            var hotSpotBucket = {
                name: this.hotSpotBucketName,
                hotSpots: []
            };

            this.HotSpotsService.createHotSpotBucket(hotSpotBucket)
                .then(() => {
                    this.hotSpotBucketName = ''; // Reset field
                    this.hotSpotBucketForm.$setPristine();
                    this.getAllHotSpotBuckets();
                });
        }
    }

    editHotSpotBucket(hotSpotBucket) {
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