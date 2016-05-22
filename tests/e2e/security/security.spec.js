var RegisterPage = require('../register/register.po.js');
var OverviewPage = require('../overview/overview.po.js');
var Login = require('../login/login.po.js');
var Common = require('../common/common.js');
var ReflectionsPage = require('../reflections/reflections.po');
var OutcomesPage = require('../outcomes/outcomes.po');

describe('Register Page', function () {

    var userOne;
    var userTwo;
    var passwordOne = "aspias4!e";
    var passwordTwo = "opiavsy%88";
    var registerPage = new RegisterPage();
    var overviewPage = new OverviewPage();
    var outcomesPage = new OutcomesPage();
    var reflectionsPage = new ReflectionsPage();
    var login = new Login();
    var common = new Common();

    beforeAll(function () {
        userOne = common.generateRandomUsername();
        userTwo = common.generateRandomUsername();

        common.clearDB();
        browser.driver.manage().deleteAllCookies();

        common.goHome();
        login.registerButton.click();
        registerPage.usernameInputField.sendKeys(userOne);
        registerPage.passwordInputField.sendKeys(passwordOne);
        registerPage.registerButton.click();

        common.outcomesMenuButton.click();
        outcomesPage.createNewOutcomeButton.click();
        outcomesPage.createNewOutcomeDailyOutcomeSubChoiceButton.click();
        outcomesPage.outcome1InputField.sendKeys("test1");
        outcomesPage.outcome2InputField.sendKeys("test2");
        outcomesPage.outcome3InputField.sendKeys("test3");
        outcomesPage.saveButton.click();

        common.outcomesMenuButton.click();
        outcomesPage.createNewOutcomeButton.click();
        outcomesPage.createNewOutcomeWeeklyOutcomeSubChoiceButton.click();
        outcomesPage.outcome1InputField.sendKeys("test1");
        outcomesPage.outcome2InputField.sendKeys("test2");
        outcomesPage.outcome3InputField.sendKeys("test3");
        outcomesPage.saveButton.click();

        common.outcomesMenuButton.click();
        outcomesPage.createNewOutcomeButton.click();
        outcomesPage.createNewOutcomeMonthlyOutcomeSubChoiceButton.click();
        outcomesPage.outcome1InputField.sendKeys("test1");
        outcomesPage.outcome2InputField.sendKeys("test2");
        outcomesPage.outcome3InputField.sendKeys("test3");
        outcomesPage.saveButton.click();

        common.reflectionsMenuButton.click();
        reflectionsPage.createNewReflectionButton.click();
        reflectionsPage.createNewReflectionWeeklyReflectionSubChoiceButton.click();
        reflectionsPage.firstThingThatWentWellInputField.sendKeys('First thing that went well');
        reflectionsPage.secondThingThatWentWellInputField.sendKeys('Second thing that went well');
        reflectionsPage.thirdThingThatWentWellInputField.sendKeys('Third thing that went well');
        reflectionsPage.firstThingToImproveInputField.sendKeys('First thing to improve');
        reflectionsPage.secondThingToImproveInputField.sendKeys('First thing to improve');
        reflectionsPage.thirdThingToImproveInputField.sendKeys('First thing to improve');
        reflectionsPage.saveButton.click();

        common.reflectionsMenuButton.click();
        reflectionsPage.createNewReflectionButton.click();
        reflectionsPage.createNewReflectionMonthlyReflectionSubChoiceButton.click();
        reflectionsPage.firstThingThatWentWellInputField.sendKeys('First thing that went well');
        reflectionsPage.secondThingThatWentWellInputField.sendKeys('Second thing that went well');
        reflectionsPage.thirdThingThatWentWellInputField.sendKeys('Third thing that went well');
        reflectionsPage.firstThingToImproveInputField.sendKeys('First thing to improve');
        reflectionsPage.secondThingToImproveInputField.sendKeys('First thing to improve');
        reflectionsPage.thirdThingToImproveInputField.sendKeys('First thing to improve');
        reflectionsPage.saveButton.click();

        common.logoutButton.click();
        login.registerButton.click();
        registerPage.usernameInputField.sendKeys(userTwo);
        registerPage.passwordInputField.sendKeys(passwordTwo);
        registerPage.registerButton.click();

        browser.waitForAngular();
    });

    beforeEach(function () {
        common.goHome();
    });

    it('should not show anything on active entries', function () {
        expect(overviewPage.currentOutcomes.count()).toBe(0);
    });

    it('should not show anything for outcomes', function () {
        common.outcomesMenuButton.click();

        expect(outcomesPage.allEntries.count()).toBe(0);
    });

    it('should not show anything for reflections', function () {
        common.reflectionsMenuButton.click();

        expect(reflectionsPage.allEntries.count()).toBe(0);
    });

    it('should not show anything for daily outcomes', function () {
        common.outcomesMenuButton.click();
        outcomesPage.createNewOutcomeButton.click();
        outcomesPage.createNewOutcomeDailyOutcomeSubChoiceButton.click();

        expect(outcomesPage.relatedEntries.count()).toBe(0);
    });

    it('should not show anything for weekly outcomes', function () {
        common.outcomesMenuButton.click();
        outcomesPage.createNewOutcomeButton.click();
        outcomesPage.createNewOutcomeWeeklyOutcomeSubChoiceButton.click();

        expect(outcomesPage.relatedEntries.count()).toBe(0);
    });

    it('should not show anything for monthly outcomes', function () {
        common.outcomesMenuButton.click();
        outcomesPage.createNewOutcomeButton.click();
        outcomesPage.createNewOutcomeMonthlyOutcomeSubChoiceButton.click();

        expect(outcomesPage.relatedEntries.count()).toBe(0);
    });

    it('should not show anything for weekly reflections', function () {
        common.reflectionsMenuButton.click();
        reflectionsPage.createNewReflectionButton.click();
        reflectionsPage.createNewReflectionWeeklyReflectionSubChoiceButton.click();

        expect(reflectionsPage.relatedEntries.count()).toBe(0);
    });

    it('should not show anything for monthly reflections', function () {
        common.reflectionsMenuButton.click();
        reflectionsPage.createNewReflectionButton.click();
        reflectionsPage.createNewReflectionMonthlyReflectionSubChoiceButton.click();

        expect(reflectionsPage.relatedEntries.count()).toBe(0);
    });


});