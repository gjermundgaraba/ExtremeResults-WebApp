var CreateOutcomePage = require('../common/createOutcome.po.js');
var CreateReflectionPage = require('../common/createReflection.po.js');
var OverviewPage = require('../overview/overview.po.js');
var Login = require('../login/login.po.js');
var Common = require('../common/common.js');

describe('Daily Outcome Page', function () {

    var createOutcomePage = new CreateOutcomePage();
    var createReflectionPage = new CreateReflectionPage();
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
        common.mondayVisionMenuButton.click();
    });

    it('should have no related outcomes before any related outcomes exist', function (){
        expect(createOutcomePage.relatedEntries.count()).toBe(0);
    });


    it('should be able to create a new daily outcome', function () {
        var outcome1 = 'Outcome number 1';
        var outcome2 = 'Outcome number 2';
        var outcome3 = 'Outcome number 3';

        createOutcomePage.outcome1InputField.sendKeys(outcome1);
        createOutcomePage.outcome2InputField.sendKeys(outcome2);
        createOutcomePage.outcome3InputField.sendKeys(outcome3);

        createOutcomePage.saveButton.click();

        common.overviewMenuButton.click();

        expect(overviewPage.currentOutcomes.count()).toBe(1);
        expect(overviewPage.titleFromCurrentOutcome(0).getText()).toBe('Weekly Outcome');
        expect(overviewPage.firstStoryFromCurrentOutcome(0).getText()).toBe(outcome1);
        expect(overviewPage.secondStoryFromCurrentOutcome(0).getText()).toBe(outcome2);
        expect(overviewPage.thirdStoryFromCurrentOutcome(0).getText()).toBe(outcome3);
    });

});