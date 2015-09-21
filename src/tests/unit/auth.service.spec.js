describe('AuthService', function () {

    var AuthService,
        ParseServiceMock,
        CookiesServiceMock,
        rootScope,
        q;

    beforeEach(module('xr.auth'));
    beforeEach(module(function ($provide) {
        ParseServiceMock = {
            login: function () {},
            retrieveCurrentUser: function () {}
        };

        CookiesServiceMock = {
            get: function () {},
            put: function () {}
        };

        $provide.value('ParseService', ParseServiceMock);
        $provide.value('$cookies', CookiesServiceMock);
    }));
    beforeEach(inject(function (_AuthService_, $q, $rootScope) {
        rootScope = $rootScope;
        q = $q;
        AuthService = _AuthService_;
    }));

    describe('login', function () {
        var user,
            deferred;

        beforeEach(function () {
            user = {
                "username": "cooldude6",
                "phone": "415-392-0202",
                "createdAt": "2011-11-07T20:58:34.448Z",
                "updatedAt": "2011-11-07T20:58:34.448Z",
                "objectId": "g7y9tkhB7O",
                "sessionToken": "r:pnktnjyb996sj4p156gjtp4im"
            };

            deferred = q.defer();
            spyOn(ParseServiceMock, 'login').and.returnValue(deferred.promise);
        });

        it('should set currentUser to the logged in user', function () {
            AuthService.login('test', 'test');
            deferred.resolve(user);
            rootScope.$digest();

            expect(rootScope.currentUser).toBe(user);
        });

        it('should set the xrAuthCookie', function () {
            spyOn(CookiesServiceMock, 'put');

            AuthService.login('test', 'test');
            deferred.resolve(user);
            rootScope.$digest();

            expect(CookiesServiceMock.put).toHaveBeenCalledWith('xrAuthCookie', user.sessionToken);
        });
    });

    describe('anyOneLoggedIn', function () {
        it('should return false when no cookie exists', function () {
            spyOn(CookiesServiceMock, 'get').and.returnValue(undefined);

            expect(AuthService.anyOneLoggedIn()).toBe(false);
        });

        it('should return true if a cookie exist', function () {
            spyOn(CookiesServiceMock, 'get').and.returnValue('Token1234');

            expect(AuthService.anyOneLoggedIn()).toBe(true);
        });
    });

    describe('updateCurrentUser', function () {
        var retrieveCurrentUserDeferred;

        beforeEach(function () {
            retrieveCurrentUserDeferred = q.defer();
            spyOn(ParseServiceMock, 'retrieveCurrentUser').and.returnValue(retrieveCurrentUserDeferred.promise);
        });

        it('should set rootScope.currentUser if not already set', function () {
            var user = {
                username: 'derp',
                sessionToken: '1234'
            };
            spyOn(CookiesServiceMock, 'get').and.returnValue('Token1234');

            AuthService.updateCurrentUser();
            retrieveCurrentUserDeferred.resolve(user);
            rootScope.$digest();

            expect(rootScope.currentUser).toBe(user);
        });

        it('should not set rootScope.currentUser if it is already set', function () {
            var user = {
                username: 'derp',
                sessionToken: '1234'
            };
            spyOn(CookiesServiceMock, 'get').and.returnValue('Token1234');

            AuthService.updateCurrentUser();
            retrieveCurrentUserDeferred.resolve(user);
            rootScope.$digest();

            expect(rootScope.currentUser).toBe(user);
        });

        it('should not set rootScope.currentUser if no cookie exists', function () {
            spyOn(CookiesServiceMock, 'get').and.returnValue(undefined);

            AuthService.updateCurrentUser();

            expect(ParseServiceMock.retrieveCurrentUser).not.toHaveBeenCalled();
            expect(rootScope.currentUser).toBeUndefined();
        });

        it('should resolve when everything works ok', function () {
            var user = {
                username: 'derp',
                sessionToken: '1234'
            };
            spyOn(CookiesServiceMock, 'get').and.returnValue('Token1234');

            var resolved = false;
            AuthService.updateCurrentUser().then(function () {
                resolved = true;
            });
            retrieveCurrentUserDeferred.resolve(user);
            rootScope.$digest();

            expect(resolved).toBe(true);
        });

        it('should return error if retrieveCurrentUser fails', function () {
            spyOn(CookiesServiceMock, 'get').and.returnValue('Token1234');

            var error = false;
            AuthService.updateCurrentUser().catch(function () {
                error = true;
            });

            retrieveCurrentUserDeferred.reject();
            rootScope.$digest();

            expect(error).toBe(true);
        });
    })

});
