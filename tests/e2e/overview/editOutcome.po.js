
var EditOutcome = function () {
    this.createOutcomeForm = element(by.css('[name="$ctrl.editOutcomeForm"]'));
    
    this.firstStory = this.createOutcomeForm.element(by.model('$ctrl.outcome.firstStory'));
    this.firstStoryFieldMessage = this.firstStory.element(by.xpath('..')).element(by.css('[ng-messages]')).element(by.xpath('*[1]'));
    
    this.secondStory = this.createOutcomeForm.element(by.model('$ctrl.outcome.secondStory'));
    this.secondStoryFieldMessage = this.secondStory.element(by.xpath('..')).element(by.css('[ng-messages]')).element(by.xpath('*[1]'))
    
    this.thirdStory = this.createOutcomeForm.element(by.model('$ctrl.outcome.thirdStory'));
    this.thirdStoryFieldMessage = this.thirdStory.element(by.xpath('..')).element(by.css('[ng-messages]')).element(by.xpath('*[1]'))
    

    this.saveButton = this.createOutcomeForm.element(by.buttonText('Save'));
};

module.exports = EditOutcome;