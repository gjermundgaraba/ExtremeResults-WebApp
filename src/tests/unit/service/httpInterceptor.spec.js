(function () {
    'use strict';

    describe('HttpHeaderInterceptor', function () {

        var httpHeaderInterceptor,
            CookiesServiceMock;

        beforeEach(module('xr.auth'));
        beforeEach(module(function ($provide) {
            CookiesServiceMock = {
                get: function () {}
            };

            $provide.value('$cookies', CookiesServiceMock);
        }));
        beforeEach(inject(function (_httpHeaderInterceptor_) {
            httpHeaderInterceptor = _httpHeaderInterceptor_;
        }));

        describe('request', function () {
            it('should add Authorization header if token exists', function () {
                var token = '1234';
                spyOn(CookiesServiceMock, 'get').and.returnValue(token);

                var config = httpHeaderInterceptor.request({ headers: {} });

                expect(config.headers.Authorization).toBe('Bearer ' + token);
            });

            it('should not add Authorization header if no token', function () {
                var config = httpHeaderInterceptor.request({ headers: {} });

                expect(config.headers.Authorization).toBeUndefined();
            });
        });
    });

})();
