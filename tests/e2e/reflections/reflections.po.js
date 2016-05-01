
var ReflectionPage = function () {

    this.reflectionsHeader = element(by.cssContainingText('h1', 'Reflections'));

    this.createNewReflectionButton = element(by.buttonText('Create New Reflection'));
    this.createNewReflectionWeeklyReflectionSubChoiceButton = element(by.buttonText('Weekly Reflection'));
    this.createNewReflectionMonthlyReflectionSubChoiceButton = element(by.buttonText('Monthly Reflection'));

    this.firstThingThatWentWellInputField = element(by.model('$ctrl.firstThingThatWentWell'));
    this.firstThingThatWentWellInputFieldMessage = this.firstThingThatWentWellInputField.element(by.xpath('..')).element(by.css('[ng-messages]')).element(by.xpath('*[1]'));

    this.secondThingThatWentWellInputField = element(by.model('$ctrl.secondThingThatWentWell'));
    this.secondThingThatWentWellInputFieldMessage = this.secondThingThatWentWellInputField.element(by.xpath('..')).element(by.css('[ng-messages]')).element(by.xpath('*[1]'));

    this.thirdThingThatWentWellInputField = element(by.model('$ctrl.thirdThingThatWentWell'));
    this.thirdThingThatWentWellInputFieldMessage = this.thirdThingThatWentWellInputField.element(by.xpath('..')).element(by.css('[ng-messages]')).element(by.xpath('*[1]'));

    this.firstThingToImproveInputField = element(by.model('$ctrl.firstThingToImprove'));
    this.firstThingToImproveInputFieldMessage = this.firstThingToImproveInputField.element(by.xpath('..')).element(by.css('[ng-messages]')).element(by.xpath('*[1]'));

    this.secondThingToImproveInputField = element(by.model('$ctrl.secondThingToImprove'));
    this.secondThingToImproveInputFieldMessage = this.secondThingToImproveInputField.element(by.xpath('..')).element(by.css('[ng-messages]')).element(by.xpath('*[1]'));

    this.thirdThingToImproveInputField = element(by.model('$ctrl.thirdThingToImprove'));
    this.thirdThingToImproveInputFieldMessage = this.thirdThingToImproveInputField.element(by.xpath('..')).element(by.css('[ng-messages]')).element(by.xpath('*[1]'));

    this.saveButton = element(by.cssContainingText('button', 'Save'));

    this.relatedEntries = element.all(by.repeater('relatedEntry in $ctrl.relatedEntries'));
};

module.exports = ReflectionPage;