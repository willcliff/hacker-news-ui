
import { HackerRankService } from '../../services/hackerrank.service';
import { Item } from '../../models/item';
import { Constants } from '../../constants';

export class ItemController implements ng.IController {

    public $inject = ['$document', 'HackerRankService', '$rootScope'];

    public isCollapsed = true;
    public commentIds: Array<number>;
    public unregisterCloseModalEventHandler: Function;

    constructor(public hackerRankService: HackerRankService, public $rootScope: ng.IScope) {}

    public $onInit() {
        this.unregisterCloseModalEventHandler = this.$rootScope.$on(Constants.CLOSE_OPEN_COMMENTS, () => {
            if (!this.isCollapsed) {
                this.resetComments();
            }
        });
    }

    public $onDestroy() {
        this.unregisterCloseModalEventHandler();
    }

    public toggleComments(commentIds: Array<number>) {
        if (commentIds && this.isCollapsed) {
            this.$rootScope.$broadcast(Constants.CLOSE_OPEN_COMMENTS);
            this.isCollapsed = !this.isCollapsed;
            this.retrieveComments(commentIds);
        } else {
            this.resetComments();
        }
    }

    public retrieveComments(commentIds: Array<number>) {
        commentIds.forEach((itemId: number) => {
                this.hackerRankService.getItem(itemId, (getItemError: any, comment: Item) => {
                    if (comment && !comment.deleted) {
                        this.hackerRankService.setComments(comment);
                    } else {
                        console.log(getItemError);
                    }
                });
            });
    }

    private resetComments() {
        this.hackerRankService.clearComments();
        this.isCollapsed = true;
    }
}
