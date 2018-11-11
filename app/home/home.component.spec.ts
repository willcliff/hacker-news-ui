import { HomeComponent } from './home.component';
import { app } from '../app';
import { HackerRankService } from '../common/services/hackerrank.service';
import { Constants } from '../common/constants';
import { dummyTopStoriesResponse, dummyItem1 } from '../common/mock-objects';
import { Item } from '../common/models/item';

describe('HomeController', () => {

    let ctrl: any;
    let $componentController: angular.IComponentControllerService;
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
                        callback(null, dummyTopStoriesResponse);
                    };
                    this.setStories = (story: Item) => {
                        this.stories.push(story);
                    };
                    this.getStories = () => {
                        return this.stories;
                    };
                    this.stories = [];
                });
            });
    });

    beforeEach(inject(
        (
            _$componentController_: ng.IComponentControllerService,
            _$document_: ng.IDocumentService,
            _hackerRankService_: HackerRankService
        ) => {
            $componentController = _$componentController_;
            $document = _$document_;
            ctrl = $componentController(HomeComponent.NAME,
                {
                    $document: $document,
                    hackerRankService: _hackerRankService_
                });
        }));

    describe('constructor', () => {

        it('should create an instance of HomeController', () => {
            expect(ctrl).toBeDefined();
            spyOn(ctrl.hackerRankService, 'getTopItemIds');
            ctrl.$onInit();
        });

        it('should retrieve the topStoryIds when the constructor is initialised', () => {
            expect(ctrl).toBeDefined();
            spyOn(ctrl.hackerRankService, 'getTopItemIds').and.callThrough();
            ctrl.numItemsToDisplay = 5;
            ctrl.$onInit();
            expect(ctrl.hackerRankService.getTopItemIds).toHaveBeenCalled();
            expect(ctrl.itemIds).toEqual(dummyTopStoriesResponse);
        });

        it('should log an error if an error occues retrieving the topItemIds', () => {
            let responseError = 'dummyResponseError';
            ctrl.hackerRankService.getTopItemIds = (equestType: string, callback: Function) => {
                expect(equestType).toBeDefined();
                callback(responseError);
            };
            spyOn(console, 'log');
            ctrl.$onInit();
            expect(console.log).toHaveBeenCalledWith('dummyResponseError');
        });

        it('should not retrieve items if the itemIds array is undefined', () => {
            ctrl.hackerRankService.getTopItemIds = (requestType: string, callback: Function) => {
                expect(requestType).toEqual(Constants.TOP_STORIES);
                callback(null, []);
            };
            spyOn(ctrl, 'retrieveItems');
            ctrl.$onInit();
            expect(ctrl.retrieveItems).not.toHaveBeenCalled();
        });

    });

    describe('retrieveItems', () => {

        it('should retrieve the top 5 items and set currentItemsDisplayed as 5', () => {
            ctrl.currentItemsDisplayed = 0;
            ctrl.numItemsToDisplay = 5;
            ctrl.retrieveItems(dummyTopStoriesResponse);
            expect(ctrl.hackerRankService.stories.length).toEqual(ctrl.currentItemsDisplayed);
        });

        it('should log an error if an error occues retrieving an item', () => {
            let responseError = 'dummyResponseError';
            ctrl.hackerRankService.getItem = (itemId: any, callback: Function) => {
                expect(itemId).toBeDefined();
                callback(responseError);
            };
            spyOn(console, 'log');
            ctrl.$onInit();
            expect(console.log).toHaveBeenCalledWith('dummyResponseError');
        });

        it('should retrieve the next 5 items when retrievItems is called a second time  and set currentItemsDisplayed as 10', () => {
            spyOn(ctrl.hackerRankService, 'setStories').and.callThrough();
            ctrl.currentItemsDisplayed = 0;
            ctrl.numItemsToDisplay = 5;
            ctrl.retrieveItems(dummyTopStoriesResponse);
            expect(ctrl.hackerRankService.stories.length).toEqual(ctrl.numItemsToDisplay);

            ctrl.retrieveItems(dummyTopStoriesResponse, ctrl.currentItemsDisplayed);
            expect(ctrl.hackerRankService.setStories).toHaveBeenCalledTimes(10);
            expect(ctrl.hackerRankService.stories.length).toEqual(10);
        });

    });
});
