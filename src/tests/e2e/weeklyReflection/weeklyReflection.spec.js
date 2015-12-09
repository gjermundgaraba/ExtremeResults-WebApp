var CreateReflectionPage = require('../common/createReflection.po.js');
var CreateOutcomePage = require('../common/createOutcome.po.js');
var OverviewPage = require('../overview/overview.po.js');
var Login = require('../login/login.po.js');
var Common = require('../common/common.js');

describe('Daily Outcome Page', function () {

    var createReflectionPage = new CreateReflectionPage();
    var createOutcomePage = new CreateOutcomePage();
    var overviewPage = new OverviewPage();
    var login = new Login();
    var common = new Common();

    beforeAll(function () {
        common.clearDB();
        browser.driver.manage().deleteAllCookies();

        common.goHome();
        login.setLoginUserName('bjaanes');
        login.setPassword('1234');
        login.loginButton.click();
        browser.waitForAngular();
    });

    beforeEach(function () {
        common.weeklyReflectionMenuButton.click();
    });

    it('should have no related entries before any related entries exist', function (){
        expect(createReflectionPage.relatedEntries.count()).toBe(0);
    });

    it('should be able to create a new daily outcome', function () {
        createReflectionPage.firstThingThatWentWellInputField.sendKeys('First thing that went well');
        createReflectionPage.secondThingThatWentWellInputField.sendKeys('Second thing that went well');
        createReflectionPage.thirdThingThatWentWellInputField.sendKeys('Third thing that went well');
        createReflectionPage.firstThingToImproveInputField.sendKeys('First thing to improve');
        createReflectionPage.secondThingToImproveInputField.sendKeys('First thing to improve');
        createReflectionPage.thirdThingToImproveInputField.sendKeys('First thing to improve');

        createReflectionPage.saveButton.click();

        common.overviewMenuButton.click();
        overviewPage.downloadAllEntriesButton.click();

        expect(overviewPage.allEntries.count()).toBe(1);
    });

    it('should show related entries', function () {
        common.mondayVisionMenuButton.click();
        createOutcomePage.outcome1InputField.sendKeys('Outcome number 1');
        createOutcomePage.outcome2InputField.sendKeys('Outcome number 2');
        createOutcomePage.outcome3InputField.sendKeys('Outcome number 3');

        createOutcomePage.saveButton.click();

        common.overviewMenuButton.click();

        common.weeklyReflectionMenuButton.click();
        expect(createReflectionPage.relatedEntries.count()).toBe(1);
    });

});