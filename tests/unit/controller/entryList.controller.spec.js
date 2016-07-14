import {module, inject} from "angular-mocks";

import "../../../app/entryList/entryList.module";

(function () {
    'use strict';

    describe('EntryList Controller', function () {

        var controller,
            EntryListServiceMock,
            rootScope,
            initDeferred,
            moreDeferred,
            q;

        beforeEach(module('xr.entryList'));
        beforeEach(module(function ($provide) {

            EntryListServiceMock = {
                getOutcomes: function () {
                },
                getReflections: function () {
                }
            };

            $provide.value('EntryListService', EntryListServiceMock);
        }));

        describe('reflections', function () {
            beforeEach(inject(function ($controller, $q, $rootScope) {
                q = $q;
                rootScope = $rootScope;

                initDeferred = q.defer();
                moreDeferred = q.defer();
                spyOn(EntryListServiceMock, 'getReflections').and.returnValues(initDeferred.promise, moreDeferred.promise);

                var data = {
                    className: 'Reflection'
                };
                controller = $controller('EntryListController', {}, data);
            }));

            describe('init', function () {

                it('should set showLoadMore to true', function () {
                    expect(controller.showLoadMore).toBe(true);
                });

                it('should set set up with empty array of entires', function () {
                    expect(controller.entryList).toBeDefined();
                    expect(controller.entryList.length).toBe(0);
                });

                it('should get outcomes', function () {
                    expect(EntryListServiceMock.getReflections).toHaveBeenCalled();
                });

                it('should update array of entries when entries get back from service', function () {
                    var resolvedData = [{ something: null }, { somethingElse: 'Derp' }];

                    initDeferred.resolve(resolvedData);
                    rootScope.$digest();

                    expect(controller.entryList).toBe(resolvedData);
                });
            });

            describe('fetchMore', function () {
                beforeEach(function () {
                    initDeferred.resolve([{}]);
                    rootScope.$digest();
                });

                it('should call entryListService with current number of entries for offset', function () {
                    controller.entryList = [{}, {}];

                    controller.fetchMore();

                    expect(EntryListServiceMock.getReflections).toHaveBeenCalledWith(2);
                });

                it('should add the new entries to the existing ones', function () {
                    controller.entryList = [{}];

                    controller.fetchMore();
                    moreDeferred.resolve([{}]);
                    rootScope.$digest();

                    expect(controller.entryList.length).toBe(2);
                });

                it('should keep showLoadMore true if entries are returned', function () {
                    controller.entryList = [{}];

                    controller.fetchMore();
                    moreDeferred.resolve([{}]);
                    rootScope.$digest();

                    expect(controller.showLoadMore).toBe(true);
                });

                it('should set showLoadMore to false if no entries are returned', function () {
                    controller.entryList = [{}];

                    controller.fetchMore();
                    moreDeferred.resolve([]);
                    rootScope.$digest();

                    expect(controller.showLoadMore).toBe(false);
                });
            });

        });

        describe('bad className', function () {
            beforeEach(inject(function ($controller, $q, $rootScope) {
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

                it('should set showLoadMore to true', function () {
                    expect(controller.showLoadMore).toBe(true);
                });

                it('should set set up with empty array of entires', function () {
                    expect(controller.entryList).toBeDefined();
                    expect(controller.entryList.length).toBe(0);
                });

                it('should not get outcomes or reflections', function () {
                    expect(EntryListServiceMock.getReflections).not.toHaveBeenCalled();
                    expect(EntryListServiceMock.getOutcomes).not.toHaveBeenCalled();
                });
            });

            describe('fetchMore', function () {
                it('should not get outcomes or reflections', function () {
                    controller.fetchMore();

                    expect(EntryListServiceMock.getReflections).not.toHaveBeenCalled();
                    expect(EntryListServiceMock.getOutcomes).not.toHaveBeenCalled();
                });
            });


        });

        describe('outcomes', function () {
            beforeEach(inject(function ($controller, $q, $rootScope) {
                q = $q;
                rootScope = $rootScope;

                initDeferred = q.defer();
                moreDeferred = q.defer();
                spyOn(EntryListServiceMock, 'getOutcomes').and.returnValues(initDeferred.promise, moreDeferred.promise);

                var data = {
                    className: 'Outcome'
                };
                controller = $controller('EntryListController', {}, data);
            }));

            describe('init', function () {

                it('should set set up with empty array of entries', function () {
                    expect(controller.entryList).toBeDefined();
                    expect(controller.entryList.length).toBe(0);
                });

                it('should get outcomes', function () {
                    expect(EntryListServiceMock.getOutcomes).toHaveBeenCalled();
                });

                it('should update array of entries when entries get back from service', function () {
                    var resolvedData = [{ something: null }, { somethingElse: 'Derp' }];

                    initDeferred.resolve(resolvedData);
                    rootScope.$digest();

                    expect(controller.entryList).toBe(resolvedData);
                });
            });

            describe('fetchMore', function () {
                beforeEach(function () {
                    initDeferred.resolve([{}]);
                    rootScope.$digest();
                });

                it('should call entryListService with current number of entries for offset', function () {
                    controller.entryList = [{}, {}];

                    controller.fetchMore();

                    expect(EntryListServiceMock.getOutcomes).toHaveBeenCalledWith(2);
                });

                it('should add the new entries to the existing ones', function () {
                    controller.entryList = [{}];

                    controller.fetchMore();
                    moreDeferred.resolve([{}]);
                    rootScope.$digest();

                    expect(controller.entryList.length).toBe(2);
                });

                it('should keep showLoadMore true if entries are returned', function () {
                    controller.entryList = [{}];

                    controller.fetchMore();
                    moreDeferred.resolve([{}]);
                    rootScope.$digest();

                    expect(controller.showLoadMore).toBe(true);
                });

                it('should set showLoadMore to false if no entries are returned', function () {
                    controller.entryList = [{}];

                    controller.fetchMore();
                    moreDeferred.resolve([]);
                    rootScope.$digest();

                    expect(controller.showLoadMore).toBe(false);
                });
            });

            describe('showLoadMoreButton', function () {
                it('should return false if still loading', function () {
                    expect(controller.showLoadMoreButton()).toBe(false);
                });

                it('should return false if loaded, but there are no entries', function () {
                    initDeferred.resolve([]);
                    rootScope.$digest();

                    expect(controller.showLoadMoreButton()).toBe(false);
                });

                it('should return true if loaded and there are entries', function () {
                    initDeferred.resolve([{}]);
                    rootScope.$digest();

                    expect(controller.showLoadMoreButton()).toBe(true);
                });
            });

        });

        describe('any className', function () {
            beforeEach(inject(function ($controller, $q, $rootScope) {
                q = $q;
                rootScope = $rootScope;

                controller = $controller('EntryListController', {});
            }));

            describe('deleteDelegate', function () {
                it('should remove the entry sent in from the entry list', function () {
                    var entry = {
                        test: 'test'
                    };
                    controller.entryList = [
                        entry
                    ];

                    controller.deleteDelegate.delete(entry);

                    expect(controller.entryList.length).toBe(0);
                });

                it('should not remove an entry if not in the list', function () {
                    var entry = {
                        test: 'test'
                    };
                    controller.entryList = [
                        {
                            not: 'the same'
                        }
                    ];

                    controller.deleteDelegate.delete(entry);

                    expect(controller.entryList.length).toBe(1);
                });
            });
        });
    });
})();