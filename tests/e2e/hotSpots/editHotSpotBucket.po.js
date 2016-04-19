
var EditHotSpotBucket = function () {
    this.editHotSpotBucketForm = element(by.css('[name="$ctrl.editHotSpotBucketForm"]'));
    this.confirmDialog = element(by.css("md-dialog"));
    this.hotSpotBucketNameInput = this.editHotSpotBucketForm.element(by.model('$ctrl.hotSpotBucket.name'));

    this.saveButton = this.editHotSpotBucketForm.element(by.buttonText('Save'));
    this.deleteButton = this.editHotSpotBucketForm.element(by.buttonText('Delete'));

    this.confirmDeleteButton = this.confirmDialog.element(by.buttonText('Yes'));
    this.declineDeleteButton = this.confirmDialog.element(by.buttonText('No'));
};

module.exports = EditHotSpotBucket;