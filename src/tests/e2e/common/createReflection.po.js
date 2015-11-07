
var ReflectionPage = function () {

    this.firstThingThatWentWellInputField = element(by.model('vm.firstThingThatWentWell'));
    this.secondThingThatWentWellInputField = element(by.model('vm.secondThingThatWentWell'));
    this.thirdThingThatWentWellInputField = element(by.model('vm.thirdThingThatWentWell'));
    this.firstThingToImproveInputField = element(by.model('vm.firstThingToImprove'));
    this.secondThingToImproveInputField = element(by.model('vm.secondThingToImprove'));
    this.thirdThingToImproveInputField = element(by.model('vm.thirdThingToImprove'));

    this.saveButton = element(by.cssContainingText('button', 'Save'));
};

module.exports = ReflectionPage;