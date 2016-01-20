(function () {
    'use strict';

    describe('ParseKeyServiceProvider Config', function () {
        var parseKeyServiceProvider;

        // Get the provider
        beforeEach(function () {
            module('xr.parse', function (ParseKeyServiceProvider) {
                parseKeyServiceProvider = ParseKeyServiceProvider;
            });
        });
        beforeEach(module('xr.config'));

        // Kick off the above function
        beforeEach(inject(function () {
        }));

        it('does its thing', function () {
            expect(parseKeyServiceProvider.applicationId).toBe('<!APPLICATION-ID!>');
            expect(parseKeyServiceProvider.restApiKey).toBe('<!REST-API-KEY!>');
        });
    });

})();