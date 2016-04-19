
var HotSpotsPage = function () {
    this.createHotSpotBucketInput = element(by.model('$ctrl.hotSpotBucketName'));
    this.createButton = element(by.cssContainingText('button', 'Create'));
    this.hotSpotBucketName = function (index) {
        return this.hotSpotBuckets.get(index).element(by.binding('hotSpotBucket.name'));
    };
    this.hotSpots = function (index) {
        return this.hotSpotBuckets.get(index).all(by.repeater('$chip in $mdChipsCtrl.items'));
    };
    this.hotSpotBucketEditButton = function (index) {
        return this.hotSpotBuckets.get(index).element(by.css('[ng-click="$ctrl.editHotSpotBucket(hotSpotBucket)"]'));
    };
    this.hotSpotInput = function (index) {
        return this.hotSpotBuckets.get(index).element(by.model('$mdChipsCtrl.chipBuffer'));
    };
    this.hotSpotDeleteButton = function (hotSpotBucketIndex, hotSpotIndex) {
        return this.hotSpots(hotSpotBucketIndex).get(hotSpotIndex).element(by.css('[ng-click="$mdChipsCtrl.removeChipAndFocusInput($$replacedScope.$index)"]'));
    };

    this.hotSpotBuckets = element.all(by.repeater('hotSpotBucket in $ctrl.hotSpotBuckets'));
};

module.exports = HotSpotsPage;