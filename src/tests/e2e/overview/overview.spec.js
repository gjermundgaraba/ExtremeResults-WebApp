var OverviewPage = require('./overview.po.js');
var Login = require('../login/login.po.js');
var CreateOutcomePage = require('../common/createOutcome.po.js');
var EditOutcome = require('./editOutcome.po');
var Common = require('../common/common.js');

describe('Overview Page', function () {

    var overviewPage = new OverviewPage();
    var login = new Login();
    var createOutcomePage = new CreateOutcomePage();
    var editOutcome = new EditOutcome();
    var common = new Common();

    beforeAll(function () {
        common.clearDB().then(function () {});
        browser.driver.manage().deleteAllCookies();

        common.goHome();
        login.setLoginUserName('bjaanes');
        login.setPassword('1234');
        login.loginButton.click();
        browser.waitForAngular();
    });

    beforeEach(function () {
        common.goHome();
        common.overviewMenuButton.click();
    });

    describe('edit', function () {
        beforeAll(function () {
            common.dailyOutcomeMenuButton.click();
            createOutcomePage.outcome1InputField.sendKeys('Outcome number 1 to be edited');
            createOutcomePage.outcome2InputField.sendKeys('Outcome number 2 to be edited');
            createOutcomePage.outcome3InputField.sendKeys('Outcome number 3 to be edited');
            createOutcomePage.saveButton.click();
            common.overviewMenuButton.click();
        });

        it('should be aoble to edit an outcome', function () {
            browser.waitForAngular();
            overviewPage.editCurrentOutcomeButton(0).click();

            editOutcome.firstStory.clear();
            editOutcome.firstStory.sendKeys('updated1');
            editOutcome.secondStory.clear();
            editOutcome.secondStory.sendKeys('updated2');
            editOutcome.thirdStory.clear();
            editOutcome.thirdStory.sendKeys('updated3');

            editOutcome.saveButton.click();

            expect(overviewPage.firstStoryFromCurrentOutcome(0).getText()).toBe('updated1');
            expect(overviewPage.secondStoryFromCurrentOutcome(0).getText()).toBe('updated2');
            expect(overviewPage.thirdStoryFromCurrentOutcome(0).getText()).toBe('updated3');
        });
    });

});