var OutcomesPage = require('./outcomes.po');
var OverviewPage = require('../overview/overview.po.js');
var Login = require('../login/login.po.js');
var Common = require('../common/common.js');

describe('Outcomes Page', function () {

    var outcomesPage = new OutcomesPage();
    var overviewPage = new OverviewPage();
    var login = new Login();
    var common = new Common();

    beforeEach(function () {
        common.goHome();
    });

    describe('Create Daily Outcome', function () {
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
            common.outcomesMenuButton.click();
            outcomesPage.createNewOutcomeButton.click();
            outcomesPage.createNewOutcomeDailyOutcomeSubChoiceButton.click();
        });

        it('should have no related outcomes before any related outcomes exist', function () {
            expect(outcomesPage.relatedEntries.count()).toBe(0);
        });

        it('should be able to create a new daily outcome', function () {
            var outcome1 = 'Outcome number 1';
            var outcome2 = 'Outcome number 2';
            var outcome3 = 'Outcome number 3';

            outcomesPage.outcome1InputField.sendKeys(outcome1);
            outcomesPage.outcome2InputField.sendKeys(outcome2);
            outcomesPage.outcome3InputField.sendKeys(outcome3);

            outcomesPage.saveButton.click();

            common.overviewMenuButton.click();

            expect(overviewPage.currentOutcomes.count()).toBe(1);
            expect(overviewPage.titleFromCurrentOutcome(0).getText()).toBe('Daily Outcome');
            expect(overviewPage.firstStoryFromCurrentOutcome(0).getText()).toBe(outcome1);
            expect(overviewPage.secondStoryFromCurrentOutcome(0).getText()).toBe(outcome2);
            expect(overviewPage.thirdStoryFromCurrentOutcome(0).getText()).toBe(outcome3);
        });

        it('should show related outcomes', function () {
            common.overviewMenuButton.click();
            common.outcomesMenuButton.click();
            outcomesPage.createNewOutcomeButton.click();
            outcomesPage.createNewOutcomeWeeklyOutcomeSubChoiceButton.click();
            outcomesPage.outcome1InputField.sendKeys('Related Outcome number 1');
            outcomesPage.outcome2InputField.sendKeys('Related Outcome number 2');
            outcomesPage.outcome3InputField.sendKeys('Related Outcome number 3');
            outcomesPage.saveButton.click();
            common.overviewMenuButton.click();

            common.outcomesMenuButton.click();
            outcomesPage.createNewOutcomeButton.click();
            outcomesPage.createNewOutcomeDailyOutcomeSubChoiceButton.click();
            expect(outcomesPage.relatedEntries.count()).toBe(1);
        });
    });

    describe('Create Weekly Outcome', function () {
        beforeAll(function () {
            common.clearDB();
            browser.driver.manage().deleteAllCookies();

            common.goHome();
            login.setLoginUserName('bjaanes');
            login.setPassword('1234');
            login.loginButton.click();
            browser.waitForAngular();
        });

        it('should have no related outcomes before any related outcomes exist', function (){
            common.outcomesMenuButton.click();
            outcomesPage.createNewOutcomeButton.click();
            outcomesPage.createNewOutcomeWeeklyOutcomeSubChoiceButton.click();

            expect(outcomesPage.relatedEntries.count()).toBe(0);
        });


        it('should be able to create a new weekly outcome', function () {
            var outcome1 = 'Outcome number 1';
            var outcome2 = 'Outcome number 2';
            var outcome3 = 'Outcome number 3';

            common.outcomesMenuButton.click();
            outcomesPage.createNewOutcomeButton.click();
            outcomesPage.createNewOutcomeWeeklyOutcomeSubChoiceButton.click();

            outcomesPage.outcome1InputField.sendKeys(outcome1);
            outcomesPage.outcome2InputField.sendKeys(outcome2);
            outcomesPage.outcome3InputField.sendKeys(outcome3);

            outcomesPage.saveButton.click();

            common.overviewMenuButton.click();

            expect(overviewPage.currentOutcomes.count()).toBe(1);
            expect(overviewPage.titleFromCurrentOutcome(0).getText()).toBe('Weekly Outcome');
            expect(overviewPage.firstStoryFromCurrentOutcome(0).getText()).toBe(outcome1);
            expect(overviewPage.secondStoryFromCurrentOutcome(0).getText()).toBe(outcome2);
            expect(overviewPage.thirdStoryFromCurrentOutcome(0).getText()).toBe(outcome3);
        });

        it('should show current months outcome as related entry', function () {
            var outcome1 = 'Outcome number 1';
            var outcome2 = 'Outcome number 2';
            var outcome3 = 'Outcome number 3';

            common.outcomesMenuButton.click();
            outcomesPage.createNewOutcomeButton.click();
            outcomesPage.createNewOutcomeMonthlyOutcomeSubChoiceButton.click();

            outcomesPage.outcome1InputField.sendKeys(outcome1);
            outcomesPage.outcome2InputField.sendKeys(outcome2);
            outcomesPage.outcome3InputField.sendKeys(outcome3);

            outcomesPage.saveButton.click();
            common.overviewMenuButton.click();

            common.outcomesMenuButton.click();
            common.outcomesMenuButton.click();
            outcomesPage.createNewOutcomeButton.click();
            outcomesPage.createNewOutcomeWeeklyOutcomeSubChoiceButton.click();
            expect(outcomesPage.relatedEntries.count()).toBe(1);
        });
    });

    describe('Create Monthly Outcome', function () {
        beforeAll(function () {
            common.clearDB();
            browser.driver.manage().deleteAllCookies();

            common.goHome();
            login.setLoginUserName('bjaanes');
            login.setPassword('1234');
            login.loginButton.click();
            browser.waitForAngular();
        });

        it('should have no related outcomes before any related outcomes exist', function (){
            common.outcomesMenuButton.click();
            outcomesPage.createNewOutcomeButton.click();
            outcomesPage.createNewOutcomeMonthlyOutcomeSubChoiceButton.click();

            expect(outcomesPage.relatedEntries.count()).toBe(0);
        });


        it('should be able to create a new monthly outcome', function () {
            var outcome1 = 'Outcome number 1';
            var outcome2 = 'Outcome number 2';
            var outcome3 = 'Outcome number 3';

            common.outcomesMenuButton.click();
            outcomesPage.createNewOutcomeButton.click();
            outcomesPage.createNewOutcomeMonthlyOutcomeSubChoiceButton.click();

            outcomesPage.outcome1InputField.sendKeys(outcome1);
            outcomesPage.outcome2InputField.sendKeys(outcome2);
            outcomesPage.outcome3InputField.sendKeys(outcome3);

            outcomesPage.saveButton.click();

            common.overviewMenuButton.click();

            expect(overviewPage.currentOutcomes.count()).toBe(1);
            expect(overviewPage.titleFromCurrentOutcome(0).getText()).toBe('Monthly Outcome');
            expect(overviewPage.firstStoryFromCurrentOutcome(0).getText()).toBe(outcome1);
            expect(overviewPage.secondStoryFromCurrentOutcome(0).getText()).toBe(outcome2);
            expect(overviewPage.thirdStoryFromCurrentOutcome(0).getText()).toBe(outcome3);
        });
    });



});