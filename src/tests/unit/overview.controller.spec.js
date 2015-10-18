(function () {
    'use strict';

    describe('Overview Controller', function(){

        var ParseServiceMock,
            userTokenMock,
            AuthServiceMock,
            controller,
            rootScope,
            initDeferred,
            q;

        beforeEach(module('xr.overview'));
        beforeEach(module(function ($provide) {
            ParseServiceMock = {
                callFunction: function () {}
            };

            userTokenMock = '1234';
            AuthServiceMock = {
                getUserToken: function () {
                    return userTokenMock;
                }
            };

            $provide.value('ParseService', ParseServiceMock);
            $provide.value('AuthService', AuthServiceMock);
        }));
        beforeEach(inject(function($controller, $q, $rootScope) {
            q = $q;
            rootScope = $rootScope;

            initDeferred = q.defer();
            spyOn(ParseServiceMock, 'callFunction').and.returnValue(initDeferred.promise);

            controller = $controller('OverviewController');
        }));

        describe('init', function () {

            it('should set set up with empty array of overview', function() {
                expect(controller.overviewEntries).toBeDefined();
                expect(controller.overviewEntries.length).toBe(0);
            });

            it('should get entries', function () {
                expect(ParseServiceMock.callFunction).toHaveBeenCalledWith('getEntries', null, userTokenMock);
            });

            it('should get active entries', function () {
                expect(ParseServiceMock.callFunction).toHaveBeenCalledWith('getActiveEntries', null, userTokenMock);
            });

            it('should update array of overviews when entries get back from service', function () {
                var resolvedData = [{something: null}, {somethingElse: 'Derp'}];

                initDeferred.resolve(resolvedData);
                rootScope.$digest();

                expect(controller.overviewEntries).toBe(resolvedData);
            });

        });

    });
})();