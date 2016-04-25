
import IDialogService = angular.material.IDialogService;
import { HotSpotsService, IHotSpotBucket } from "../hotSpots.service";

export class EditHotSpotBucketController {
    static $inject = ['$mdDialog', 'HotSpotsService'];

    saving: boolean = false;
    hotSpotBucket: IHotSpotBucket;
    deleteCallback: Function;
    renameCallback: Function;

    constructor(private $mdDialog: IDialogService, private hotSpotsService: HotSpotsService) {}

    save(): void {
        if (!this.saving) {
            this.saving = true;
            var updateObject = {
                name: this.hotSpotBucket.name
            };

            this.hotSpotsService.editHotSpotBucket(this.hotSpotBucket.objectId, updateObject)
                .then(() => {
                    this.renameCallback(this.hotSpotBucket);
                    this.$mdDialog.hide();
                })
                .finally(() => {
                    this.saving = false;
                });
        }
    }

    deleteHotSpotBucket(): void {
        if (!this.saving) {
            var confirm = this.$mdDialog.confirm()
                .title('Are you sure you want to delete this hot spot bucket?')
                .ok('Yes')
                .cancel('No');

            this.$mdDialog.show(confirm)
                .then(() => {
                    this.saving = true;

                    this.hotSpotsService.deleteHotSpotBucket(this.hotSpotBucket.objectId)
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