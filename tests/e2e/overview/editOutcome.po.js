
var EditOutcome = function () {
    this.createOutcomeForm = element(by.css('[name="$ctrl.editOutcomeForm"]'));
    this.firstStory = this.createOutcomeForm.element(by.model('$ctrl.outcome.firstStory'));
    this.secondStory = this.createOutcomeForm.element(by.model('$ctrl.outcome.secondStory'));
    this.thirdStory = this.createOutcomeForm.element(by.model('$ctrl.outcome.thirdStory'));

    this.saveButton = this.createOutcomeForm.element(by.buttonText('Save'));
};

module.exports = EditOutcome;