
var ReflectionPage = function () {

    this.createNewReflectionButton = element(by.buttonText('Create New Reflection'));
    this.createNewReflectionWeeklyReflectionSubChoiceButton = element(by.buttonText('Weekly Reflection'));

    this.firstThingThatWentWellInputField = element(by.model('$ctrl.firstThingThatWentWell'));
    this.secondThingThatWentWellInputField = element(by.model('$ctrl.secondThingThatWentWell'));
    this.thirdThingThatWentWellInputField = element(by.model('$ctrl.thirdThingThatWentWell'));
    this.firstThingToImproveInputField = element(by.model('$ctrl.firstThingToImprove'));
    this.secondThingToImproveInputField = element(by.model('$ctrl.secondThingToImprove'));
    this.thirdThingToImproveInputField = element(by.model('$ctrl.thirdThingToImprove'));

    this.saveButton = element(by.cssContainingText('button', 'Save'));

    this.relatedEntries = element.all(by.repeater('relatedEntry in $ctrl.relatedEntries'));
};

module.exports = ReflectionPage;