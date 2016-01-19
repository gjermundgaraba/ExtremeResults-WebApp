
var EditOutcome = function () {
    this.createOutcomeForm = element(by.css('[name="vm.editOutcomeForm"]'));
    this.firstStory = this.createOutcomeForm.element(by.model('vm.outcome.firstStory'));
    this.secondStory = this.createOutcomeForm.element(by.model('vm.outcome.secondStory'));
    this.thirdStory = this.createOutcomeForm.element(by.model('vm.outcome.thirdStory'));

    this.saveButton = this.createOutcomeForm.element(by.buttonText('Save'));
};

module.exports = EditOutcome;