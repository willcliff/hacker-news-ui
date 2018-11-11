import { ItemComponent } from '../item/item.component';
import { app } from '../../../app';
import { Constants } from '../../constants';
import { HackerRankService } from '../../services/hackerrank.service';
import { dummyTopItemsResponse, dummyItem1 } from '../../mock-objects';
import { Item } from '../../models/item';

describe('ItemController', () => {

    let ctrl: any;
    let $componentController: angular.IComponentControllerService;
    let $rootScope: ng.IScope;
    let $document: ng.IDocumentService;

    beforeEach(() => {
        angular.mock.module('ui.router');
        angular.mock.module(app.name,
            (_$provide_: angular.auto.IProvideService) => {
                _$provide_.service(HackerRankService.NAME, function () {
                    this.getItem = (itemId: any, callback: Function) => {
                        expect(itemId).toBeDefined();
                        callback(null, dummyItem1);
                    };
                    this.getTopItemIds = (requestType: string, callback: Function) => {
                        expect(requestType).toEqual(Constants.TOP_STORIES);
                        callback(null, dummyTopItemsResponse);
                    };
                    this.setComments = (story: Item) => {
                        this.comments.push(story);
                    };
                    this.getComments = () => {
                        return this.comments;
                    };
                    this.clearComments = () => {
                        this.comments = [];
                    };
                    this.comments = [];
                });
            });
    });

    beforeEach(inject(
        (
            _$componentController_: ng.IComponentControllerService,
            _$rootScope_: ng.IScope,
            _$document_: ng.IDocumentService,
            _hackerRankService_: HackerRankService
        ) => {
            $componentController = _$componentController_;
            $rootScope = _$rootScope_;
            $document = _$document_;
            ctrl = $componentController(ItemComponent.NAME,
                {
                    $document: $document,
                    hackerRankService: _hackerRankService_
                });
            ctrl.$onInit();
        }));

    describe('$onInit', () => {

        it('should create an instance of ItemController', () => {
            expect(ctrl).toBeDefined();
        });

        it('should reset and close the comments when the the close comments event is broadcast and the comments are open', () => {
            spyOn(ctrl, 'resetComments');
            ctrl.$onInit();
            ctrl.isCollapsed = false;
            $rootScope.$broadcast(Constants.CLOSE_OPEN_COMMENTS);
            expect(ctrl.resetComments).toHaveBeenCalled();
        });

        it('should not reset and close the comments when the the close comments event is broadcast and the comments are not pen', () => {
            spyOn(ctrl, 'resetComments');
            ctrl.$onInit();
            ctrl.isCollapsed = true;
            $rootScope.$broadcast(Constants.CLOSE_OPEN_COMMENTS);
            expect(ctrl.resetComments).not.toHaveBeenCalled();
        });

    });

    describe('$onDestroy()', () => {

        it('should unregister the event listeners', () => {
            spyOn(ctrl, 'unregisterCloseModalEventHandler');
            ctrl.$onDestroy();
            expect(ctrl.unregisterCloseModalEventHandler).toHaveBeenCalled();
        });

    });

    describe('toggleComments', () => {

        it('should retrieve and display the comments and close other comments when the button is toggled', () => {
            spyOn(ctrl.hackerRankService, 'clearComments');
            spyOn(ctrl, 'retrieveComments');
            spyOn($rootScope, '$broadcast');
            $rootScope.$broadcast(Constants.CLOSE_OPEN_COMMENTS);

            ctrl.isCollapsed = true;
            ctrl.toggleComments(dummyItem1.kids);
            expect($rootScope.$broadcast).toHaveBeenCalledWith(Constants.CLOSE_OPEN_COMMENTS);
            expect(ctrl.retrieveComments).toHaveBeenCalled();
            expect(ctrl.isCollapsed).toEqual(false);
        });

        it('should not retrieve the comments and close the comment display when the button is toggled', () => {
            spyOn(ctrl, 'resetComments').and.callThrough();
            spyOn(ctrl, 'retrieveComments');
            ctrl.isCollapsed = false;
            ctrl.toggleComments(dummyItem1.kids);
            expect(ctrl.retrieveComments).not.toHaveBeenCalled();
            expect(ctrl.resetComments).toHaveBeenCalled();
            expect(ctrl.isCollapsed).toEqual(true);
        });

    });

    describe('retrieveComments', () => {

        it('should retrieve the comments from the given array', () => {
            spyOn(ctrl.hackerRankService, 'getItem').and.callThrough();
            ctrl.retrieveComments(dummyTopItemsResponse);
            expect(ctrl.hackerRankService.getItem).toHaveBeenCalled();
        });

        it('should retrieve the comments from the given array', () => {
            let responseError = 'dummyResponseError';
            ctrl.hackerRankService.getItem = (itemId: any, callback: Function) => {
                expect(itemId).toBeDefined();
                callback(responseError);
            };
            spyOn(ctrl.hackerRankService, 'getItem').and.callThrough();
            spyOn(console, 'log');
            ctrl.retrieveComments(dummyTopItemsResponse);
            expect(console.log).toHaveBeenCalledWith('dummyResponseError');
            expect(ctrl.hackerRankService.getItem).toHaveBeenCalled();
        });

    });

    describe('resetComments', () => {

        it('should reset and close the comments when the the close comments event is broadcast and the comments are open', () => {
            spyOn(ctrl.hackerRankService, 'clearComments');
            ctrl.isCollapsed = false;
            ctrl.resetComments();
            expect(ctrl.hackerRankService.clearComments).toHaveBeenCalled();
            expect(ctrl.isCollapsed).toEqual(true);
        });

    });
});
