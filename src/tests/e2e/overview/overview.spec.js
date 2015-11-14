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
    });

    describe('init', function () {
        it('should have a help section when there are no entries', function () {
            expect(overviewPage.firstTimeHelp.isPresent()).toBe(true);
        });

    });

    describe('edit', function () {
        beforeAll(function () {
            common.dailyOutcomeMenuButton.click();
            createOutcomePage.outcome1InputField.sendKeys('Outcome number 1');
            createOutcomePage.outcome2InputField.sendKeys('Outcome number 2');
            createOutcomePage.outcome3InputField.sendKeys('Outcome number 3');
            createOutcomePage.saveButton.click();
            common.overviewMenuButton.click();
        });

        it('should be able to edit an outcome', function () {
            browser.debugger();
            overviewPage.editCurrentOutcomeButton(0).click(); // for now, only one outcome to edit anyways, later we might need to change this

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