
var EditHotSpotBucket = function () {
    this.editHotSpotBucketForm = element(by.css('[name="vm.editHotSpotBucketForm"]'));
    this.hotSpotBucketNameInput = this.editHotSpotBucketForm.element(by.model('vm.hotSpotBucket.name'));

    this.saveButton = this.editHotSpotBucketForm.element(by.buttonText('Save'));
};

module.exports = EditHotSpotBucket;