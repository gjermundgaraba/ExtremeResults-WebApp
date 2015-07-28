var OverviewPage = require('./overview.po.js');

describe('Overview Page', function () {

    var overviewPage = new OverviewPage();

    it('should have a help section when there are no entries', function () {
        browser.get(browser.params.client);
        expect(overviewPage.firstTimeHelp.isPresent()).toBe(true);
    });

});