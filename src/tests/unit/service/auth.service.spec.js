(function () {
    'use strict';

    describe('AuthService', function () {

        var AuthService,
            Urls,
            jwtHelperMock,
            CookiesServiceMock,
            rootScope,
            httpBackend,
            q;

        beforeEach(module('xr.auth'));
        beforeEach(module(function ($provide) {
            jwtHelperMock = {
                decodeToken: function () {}
            };

            CookiesServiceMock = {
                get: function () {},
                put: function () {},
                remove: function () {}
            };

            $provide.value('jwtHelper', jwtHelperMock);
            $provide.value('$cookies', CookiesServiceMock);
        }));
        beforeEach(inject(function (_AuthService_, $q, $rootScope, $httpBackend, _Urls_) {
            rootScope = $rootScope;
            httpBackend = $httpBackend;
            q = $q;
            AuthService = _AuthService_;
            Urls = _Urls_;
        }));

        describe('login', function () {
            it('should set the xrAuthCookie', function () {
                var token = '1234';
                spyOn(CookiesServiceMock, 'put');

                httpBackend.whenPOST(Urls.baseApi + 'login').respond(200, { token: token});
                AuthService.login('test', 'test');

                rootScope.$digest();
                httpBackend.flush();

                expect(CookiesServiceMock.put).toHaveBeenCalledWith('xrAuthCookie', token);
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

        describe('register', function () {

            it('should resolve when register API call is OK', function () {
                var resolved = false;

                httpBackend.whenPOST(Urls.baseApi + 'register').respond(201, {token: '123'});

                AuthService.register({}).then(function () {
                    resolved = true;
                });

                rootScope.$digest();
                httpBackend.flush();

                expect(resolved).toBe(true);
            });

            it('should return an error when register API call fails', function () {
                var error = false;

                httpBackend.whenPOST(Urls.baseApi + 'register').respond(500);


                AuthService.register({}).catch(function () {
                    error = true;
                });

                rootScope.$digest();
                httpBackend.flush();

                expect(error).toBe(true);
            });

            it('should update token after register completes', function () {
                spyOn(CookiesServiceMock, 'put');
                var token = '123';
                httpBackend.whenPOST(Urls.baseApi + 'register').respond(201, {token: token});
                AuthService.register({});

                rootScope.$digest();
                httpBackend.flush();

                expect(CookiesServiceMock.put).toHaveBeenCalledWith('xrAuthCookie', token);
            });

        });

        describe('logout', function () {
            it('should remove the cookie', function () {
                spyOn(CookiesServiceMock, 'remove');

                AuthService.logout();

                expect(CookiesServiceMock.remove).toHaveBeenCalled();
            });
        });

        describe('getUserToken', function () {
            it('should return current users sessionToken', function () {
                var token = '1234';
                spyOn(CookiesServiceMock, 'get').and.returnValue(token);

                rootScope.$digest();

                expect(AuthService.getUserToken()).toBe(token);
            });
        });

        describe('getCurrentUser', function () {
            var token,
                tokenPayLoad;

            beforeEach(function () {
                token = 'token123';
                tokenPayLoad = {
                    username: 'test'
                };

                spyOn(CookiesServiceMock, 'get').and.returnValue(token);
                spyOn(jwtHelperMock, 'decodeToken').and.returnValue(tokenPayLoad);
            });

            it('should return the payload from the token', function () {
                var currentUser = AuthService.getCurrentUser();

                expect(currentUser).toEqual(tokenPayLoad);
            });

        });

    });

})();
