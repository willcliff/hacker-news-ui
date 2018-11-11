import { Constants } from '../constants';
import { Item } from '../models/item';

export class HackerRankService {
    public static NAME = 'hackerRankService';

    public stories: Array<Item> = [];
    public comments: Array<Item> = [];
    public currentViewedItem: string;

    public $inject = ['$http'];
    constructor(private $http: ng.IHttpService) { }

    public getItem(itemId: number, callback: Function) {
        let url = Constants.GET_ITEMS_URL(itemId);
        return this.$http.get(url, {
            headers: { ['Access-Control-Allow-Origin']: '*'}
        }).then(
            ((response: ng.IHttpResponse<Item>): void => {
                // response.data = dummyItem1;
                callback(null, response.data);
            }),
            ((error) => {
                callback(error.data);
            }));
    }

    public getTopItemIds(requestType: string, callback: Function) {
        let url = Constants.TOP_ITEMS_URL(requestType);
        return this.$http.get(url, {
            headers: { ['Access-Control-Allow-Origin']: '*'}
        }).then(
            ((response: ng.IHttpResponse<Array<string>>): void => {
                callback(null, response.data);
            }),
            ((error) => {
                callback(error.data);
            }));
    }

    public getStories() {
        return this.stories;
    }

    public setStories(story: Item) {
        this.stories.push(story);
    }

    public getComments() {
        return this.comments;
    }

    public setComments(comment: Item) {
        this.comments.push(comment);
    }

    public clearComments() {
        this.comments = [];
    }
}
