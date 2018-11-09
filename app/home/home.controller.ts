
import { HackerRankService } from '../common/services/hackerrank.service';
import { Constants } from '../common/constants';
import { Item } from '../common/models/item';

export class HomeController implements ng.IController {
    public $inject = ['$document', 'HackerRankService', '$uibModal'];
    public itemIds: Array<string>;

    private beginItemsToDisplay = 0;
    private numItemsToDisplay = 30;

    constructor(public $document: ng.IDocumentService, public hackerRankService: HackerRankService) {
        hackerRankService.getTopItemIds(Constants.TOP_STORIES, (error: any, response: any) => {
            if (!error) {
                this.itemIds = response;
                this.retrieveItem(response);
            }
        });
    }

    public retrieveItem(itemIds: Array<string>, incrementStartNum?: number) {
        if (incrementStartNum) {
            this.beginItemsToDisplay = incrementStartNum;
            this.numItemsToDisplay = this.numItemsToDisplay + incrementStartNum;
        }
        itemIds.slice(this.beginItemsToDisplay, this.numItemsToDisplay).forEach((itemId: string, index: number) => {
            this.hackerRankService.getItem(itemId, (getItemError: any, item: Item) => {
                if (!getItemError) {
                    this.hackerRankService.setItems(item);
                    this.beginItemsToDisplay = index + 1;
                } else {
                    console.log('WILL TEST = ', getItemError);
                }
            });
        });
    }
}
