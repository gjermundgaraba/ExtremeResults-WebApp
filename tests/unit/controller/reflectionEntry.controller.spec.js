import { module, inject } from "angular-mocks";

import "../../../app/entry/entry.module";

(function () {
    'use strict';

    describe('Reflection Entry Controller', function(){

        var XrUtilsMock,
            headerMock,
            formattedDateMock,
            controller;

        beforeEach(module('xr.entry'));
        beforeEach(module(function ($provide) {
            headerMock = 'HEADERMOCKYMOCK';
            formattedDateMock = 'Some formatted date';

            XrUtilsMock = {
                getEntryHeader: function () {
                    return headerMock;
                },
                getFormattedEntryDate: function () {
                    return formattedDateMock;
                }
            };

            $provide.value('XrUtils', XrUtilsMock);
        }));
        beforeEach(inject(function($controller, $rootScope) {
            controller = $controller('ReflectionEntryController', {$scope: $rootScope});
        }));

        describe('init', function () {

            it('should get and set header', function() {
                expect(controller.header).toBe(headerMock);
            });

            it('should get and set outcome time', function () {
                expect(controller.reflectionTime).toBe(formattedDateMock);
            });
        });

    });
})();