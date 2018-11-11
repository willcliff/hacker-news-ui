
import { HackerRankService } from '../common/services/hackerrank.service';
import { Constants } from '../common/constants';
import { Item } from '../common/models/item';

export class HomeController implements ng.IController {
    public $inject = ['$document', 'HackerRankService'];
    public itemIds: Array<number>;

    private currentItemsDisplayed = 0;
    private numItemsToDisplay = 20;

    constructor(public $document: ng.IDocumentService, public hackerRankService: HackerRankService) { }

    public $onInit() {
        this.hackerRankService.getTopItemIds(Constants.TOP_STORIES, (error: any, response: Array<number>) => {
            if (response && response.length > 0) {
                this.itemIds = response;
                    this.retrieveItems(response);
            } else {
                console.log(error);
            }
        });
    }

    public retrieveItems(itemIds: Array<number>, currentItemsDisplayed?: number) {
        if (currentItemsDisplayed) {
            this.currentItemsDisplayed = currentItemsDisplayed;
            this.numItemsToDisplay = this.numItemsToDisplay + currentItemsDisplayed;
        }
            itemIds.slice(this.currentItemsDisplayed, this.numItemsToDisplay).forEach((itemId: number, index: number) => {
                this.hackerRankService.getItem(itemId, (getItemError: any, item: Item) => {
                    if (!getItemError) {
                        this.hackerRankService.setStories(item);
                        this.currentItemsDisplayed = index + 1;
                    } else {
                        console.log(getItemError);
                    }
                });
            });
    }
}
