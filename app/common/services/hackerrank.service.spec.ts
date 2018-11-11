import { HackerRankService } from './hackerrank.service';
import { app } from '../../app';
import { Constants } from '../constants';
import { dummyItem1, dummyTopStoriesResponse, dummyItemsArray, dummyItem2 } from '../mock-objects';
import { Item } from '../models/item';

describe('Service: siteService', () => {
  let hackerRankService: HackerRankService;
  let httpBackend: angular.IHttpBackendService;

  beforeEach(() => {
    angular.mock.module('ui.router');
    angular.mock.module(app.name);
  });

  beforeEach(inject(
    (_$rootScope_: angular.IScope,
      $http: angular.IHttpService,
      $httpBackend: angular.IHttpBackendService,
      _hackerRankService_: HackerRankService) => {
      httpBackend = $httpBackend;
      hackerRankService = _hackerRankService_;
      hackerRankService = new HackerRankService($http);
    }));

  describe('constructor', () => {
    it('should initialize correctly', () => {
      expect(hackerRankService).toBeDefined();
    });
  });

  describe('getItem', () => {
    it('should get the item from the hacker rank service', (done) => {
      let itemId = dummyItem1.id;
      httpBackend.when('GET', Constants.GET_ITEMS_URL(itemId))
        .respond(dummyItem1);
      hackerRankService.getItem(dummyItem1.id, (error: any, item: Item) => {
        expect(error).toBeNull();
        expect(item).toEqual(dummyItem1);
        done();
      });
      httpBackend.flush();
    });

    it('should return an error if the item could not be retrieved', (done) => {
      let itemId = dummyItem1.id;
      httpBackend.when('GET', Constants.GET_ITEMS_URL(itemId))
        .respond(403, 'dummyResponseError');
      hackerRankService.getItem(dummyItem1.id, (error: any, item: Item) => {
        expect(error).toEqual('dummyResponseError');
        expect(item).toBeUndefined();
        done();
      });
      httpBackend.flush();
    });
  });

  describe('getTopStories', () => {
    it('should get the top stories from the hacker rank service', (done) => {
      httpBackend.when('GET', Constants.TOP_ITEMS_URL(Constants.TOP_STORIES))
        .respond(dummyTopStoriesResponse);
      hackerRankService.getTopItemIds(Constants.TOP_STORIES, (error: any, itemIds: Array<number>) => {
        expect(error).toBeNull();
        expect(itemIds).toEqual(dummyTopStoriesResponse);
        done();
      });
      httpBackend.flush();
    });

    it('should return an error if the top stories could not be retrieved', (done) => {
      httpBackend.when('GET', Constants.TOP_ITEMS_URL(Constants.TOP_STORIES))
        .respond(403, 'dummyResponseError');
      hackerRankService.getTopItemIds(Constants.TOP_STORIES, (error: any, itemIds: Array<number>) => {
        expect(error).toEqual('dummyResponseError');
        expect(itemIds).toBeUndefined();
        done();
      });
      httpBackend.flush();
    });
  });

  describe('should get and set items', () => {

    it('should set the items', () => {
      hackerRankService.stories = [];
      hackerRankService.setStories(dummyItem1);
      hackerRankService.setStories(dummyItem2);
      expect(hackerRankService.stories).toEqual(dummyItemsArray);
    });

    it('should get the items', () => {
      hackerRankService.stories = dummyItemsArray;
      expect(hackerRankService.getStories()).toEqual(dummyItemsArray);
    });

  });

  describe('should get and set items', () => {

    it('should set the comments', () => {
      hackerRankService.comments = [];
      hackerRankService.setComments(dummyItem1);
      hackerRankService.setComments(dummyItem2);
      expect(hackerRankService.comments).toEqual(dummyItemsArray);
    });

    it('should get the comments', () => {
      hackerRankService.comments = dummyItemsArray;
      expect(hackerRankService.getComments()).toEqual(dummyItemsArray);
    });

    it('should clear the comments', () => {
      hackerRankService.comments = dummyItemsArray;
      hackerRankService.clearComments();
      expect(hackerRankService.comments).toEqual([]);
    });

  });

});
