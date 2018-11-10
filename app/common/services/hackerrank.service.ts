import { Constants } from '../constants';
import { Item } from '../models/item';
// import { dummyTopStoriesResponse, dummyItem1, dummyItemsArray } from '../mock-objects';

export class HackerRankService {
    public static NAME = 'hackerRankService';
    public errorOccurred = false;
    public errorMessage = '';
    public items: Array<Item> = [];

    public $inject = ['$http'];
    // private items = '';
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

    public getItems() {
        return this.items;
    }

    public setItems(item: Item) {
        this.items.push(item);
    }
}

