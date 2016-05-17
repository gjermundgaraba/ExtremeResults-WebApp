import { module, inject } from "angular-mocks";

import "../../../app/entryList/entryList.module";

(function () {
    'use strict';

    describe('EntryList Controller', function(){

        var controller,
            EntryListServiceMock,
            rootScope,
            initDeferred,
            q;

        beforeEach(module('xr.entryList'));
        beforeEach(module(function ($provide) {

            EntryListServiceMock = {
                getOutcomes: function () {},
                getReflections: function() {}
            };

            $provide.value('EntryListService', EntryListServiceMock);
        }));

        describe('init for outcomes', function () {
            beforeEach(inject(function($controller, $q, $rootScope) {
                q = $q;
                rootScope = $rootScope;

                initDeferred = q.defer();
                spyOn(EntryListServiceMock, 'getOutcomes').and.returnValue(initDeferred.promise);

                var data = {
                    className: 'Outcome'
                };
                controller = $controller('EntryListController', {}, data);
            }));

            describe('init', function () {

                it('should set set up with empty array of entires', function() {
                    expect(controller.entryList).toBeDefined();
                    expect(controller.entryList.length).toBe(0);
                });

                it('should get outcomes', function () {
                    expect(EntryListServiceMock.getOutcomes).toHaveBeenCalled();
                });

                it('should update array of entries when entries get back from service', function () {
                    var resolvedData = [{something: null}, {somethingElse: 'Derp'}];

                    initDeferred.resolve(resolvedData);
                    rootScope.$digest();

                    expect(controller.entryList).toBe(resolvedData);
                });
            });
        });

        describe('for reflections', function () {
            beforeEach(inject(function($controller, $q, $rootScope) {
                q = $q;
                rootScope = $rootScope;

                initDeferred = q.defer();
                spyOn(EntryListServiceMock, 'getReflections').and.returnValue(initDeferred.promise);

                var data = {
                    className: 'Reflection'
                };
                controller = $controller('EntryListController', {}, data);
            }));

            describe('init', function () {

                it('should set set up with empty array of entires', function() {
                    expect(controller.entryList).toBeDefined();
                    expect(controller.entryList.length).toBe(0);
                });

                it('should get outcomes', function () {
                    expect(EntryListServiceMock.getReflections).toHaveBeenCalled();
                });

                it('should update array of entries when entries get back from service', function () {
                    var resolvedData = [{something: null}, {somethingElse: 'Derp'}];

                    initDeferred.resolve(resolvedData);
                    rootScope.$digest();

                    expect(controller.entryList).toBe(resolvedData);
                });
            });
        });

        describe('for bad className', function() {
            beforeEach(inject(function($controller, $q, $rootScope) {
                q = $q;
                rootScope = $rootScope;

                spyOn(EntryListServiceMock, 'getReflections');
                spyOn(EntryListServiceMock, 'getOutcomes');

                var data = {
                    className: 'ThisIsBad'
                };
                controller = $controller('EntryListController', {}, data);
            }));

            describe('init', function () {

                it('should set set up with empty array of entires', function() {
                    expect(controller.entryList).toBeDefined();
                    expect(controller.entryList.length).toBe(0);
                });

                it('should not get outcomes or reflections', function () {
                    expect(EntryListServiceMock.getReflections).not.toHaveBeenCalled();
                    expect(EntryListServiceMock.getOutcomes).not.toHaveBeenCalled();
                });
            });

        });

    });
})();